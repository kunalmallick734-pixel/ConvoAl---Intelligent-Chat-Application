import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use gemini-3.7-flash with graceful fallback
    const modelNames = ["gemini-3.7-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-3.8-flash"];
    let result = null;
    const lastMessage = body.messages[body.messages.length - 1].content;

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContentStream(lastMessage);
        break;
      } catch (err) {
        console.warn(`Model ${modelName} failed, trying next...`, (err as Error).message);
      }
    }

    if (!result) {
      throw new Error("Unable to connect to Gemini models. Please try again.");
    }

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`));
        }
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
