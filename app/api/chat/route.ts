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
    
    // Primary fast model: gemini-3.1-flash-lite with multiple fallbacks
    const modelNames = [
      "gemini-3.1-flash-lite",
      "gemini-3.7-flash",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-3.8-flash"
    ];

    const lastMessage = body.messages[body.messages.length - 1].content;

    const stream = new ReadableStream({
      async start(controller) {
        let streamedAny = false;
        
        for (const modelName of modelNames) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContentStream(lastMessage);
            
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                streamedAny = true;
                controller.enqueue(
                  new TextEncoder().encode(
                    `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`
                  )
                );
              }
            }
            // Successfully streamed
            break;
          } catch (modelErr) {
            console.warn(`Model ${modelName} stream error:`, (modelErr as Error).message);
            if (streamedAny) {
              // If we already sent partial tokens, don't restart stream
              break;
            }
          }
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
