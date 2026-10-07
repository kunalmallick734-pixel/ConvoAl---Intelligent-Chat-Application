import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

interface Message {
  role: "user" | "assistant";
  content: string;
  selectedText?: string | null;
  timestamp?: string;
  error?: boolean;
}

interface Chat {
  id: string;
  name: string;
  User: string;
  Messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "chats.json");

async function readChats(): Promise<Chat[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeChats(chats: Chat[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(chats, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const { query, variables = {} } = await req.json();
    const chats = await readChats();

    // 1. getAiHistoryByUser
    if (query.includes("getAiHistoryByUser")) {
      const userChats = chats
        .filter((c) => c.User === variables.userId)
        .map(({ id, name, User, createdAt, updatedAt }) => ({
          id,
          name,
          User,
          createdAt,
          updatedAt,
        }));

      return NextResponse.json({
        data: { getAiHistoryByUser: userChats },
      });
    }

    // 2. getAiChatById
    if (query.includes("getAiChatById")) {
      const chat = chats.find((c) => c.id === variables.chatId);
      if (!chat) {
        return NextResponse.json(
          { errors: [{ message: "Chat not found" }] },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: { getAiChatById: chat },
      });
    }

    // 3. addAiResponse (create chat)
    if (query.includes("addAiResponse")) {
      const now = new Date().toISOString();
      const newChat: Chat = {
        id: crypto.randomUUID(),
        name: variables.name || "New chat",
        User: variables.userId || "",
        Messages: [],
        createdAt: now,
        updatedAt: now,
      };

      chats.unshift(newChat);
      await writeChats(chats);

      return NextResponse.json({
        data: {
          addAiResponse: {
            id: newChat.id,
            name: newChat.name,
            User: newChat.User,
            createdAt: newChat.createdAt,
            updatedAt: newChat.updatedAt,
          },
        },
      });
    }

    // 4. updateChatName
    if (query.includes("updateChatName")) {
      const chat = chats.find((c) => c.id === variables.chatId);
      if (chat) {
        chat.name = variables.name;
        chat.updatedAt = new Date().toISOString();
        await writeChats(chats);
      }

      return NextResponse.json({
        data: {
          updateChatName: {
            id: variables.chatId,
            name: variables.name,
          },
        },
      });
    }

    // 5. appendMessage
    if (query.includes("appendMessage")) {
      const chat = chats.find((c) => c.id === variables.chatId);
      if (chat) {
        const msg: Message = {
          role: variables.message?.role,
          content: variables.message?.content,
          selectedText: variables.message?.selectedText || null,
          timestamp: variables.message?.timestamp || new Date().toISOString(),
          error: variables.message?.error || false,
        };
        chat.Messages.push(msg);
        chat.updatedAt = new Date().toISOString();
        await writeChats(chats);

        return NextResponse.json({
          data: {
            appendMessage: {
              id: chat.id,
              Messages: chat.Messages,
            },
          },
        });
      }

      return NextResponse.json({
        data: {
          appendMessage: {
            id: variables.chatId,
            Messages: [],
          },
        },
      });
    }

    // 6. deleteChat
    if (query.includes("deleteChat")) {
      const filtered = chats.filter((c) => c.id !== variables.chatId);
      await writeChats(filtered);

      return NextResponse.json({
        data: { deleteChat: true },
      });
    }

    return NextResponse.json(
      { errors: [{ message: "Unknown GraphQL operation" }] },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: (error as Error).message }] },
      { status: 500 }
    );
  }
}
