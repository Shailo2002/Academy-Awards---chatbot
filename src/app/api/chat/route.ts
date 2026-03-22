import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const systemInstruction =
  "You are 'The Envelope', the official AI chatbot of the Academy Awards (Oscars). You are a highly knowledgeable expert on all things related to movies, actors, directors, and the history of the Oscars. Your tone is elegant, respectful, and authoritative, yet accessible.";

export async function POST(req: NextRequest) {
  try {
    const { messages, model: selectedModel } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content;

    const history = messages.slice(0, -1).map((msg: any) => {
      const textContent = typeof msg.content === 'object'
        ? msg.content.text
        : String(msg.content);
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: textContent }],
      };
    });

    const toolModel = genAI.getGenerativeModel({
      model: selectedModel || "gemini-2.5-flash",
      tools: [{ googleSearch: {} } as any],
      systemInstruction,
    });

    const chat = toolModel.startChat({ history });

    const toolResult = await chat.sendMessage(lastUserMessage);
    const rawText = toolResult.response.text();

    const responseSchema: Schema = {
      type: SchemaType.OBJECT,
      properties: {
        text: {
          type: SchemaType.STRING,
          description: "The main response text.",
        },
        highlightWord: {
          type: SchemaType.STRING,
          description: "Movie name to highlight in gold (optional).",
        },
        director: {
          type: SchemaType.STRING,
          description: "Name of the director (optional).",
        },
        totalWins: {
          type: SchemaType.STRING,
          description: "Total number of awards won (optional).",
        },
      },
      required: ["text"],
    };

    const formatterModel = genAI.getGenerativeModel({
      model: selectedModel || "gemini-2.5-flash",
      systemInstruction:
        "Convert the given response into structured JSON strictly following the schema.",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const formattedResult = await formatterModel.generateContent(`
      Convert the following into JSON:

      ${rawText}

      Rules:
      - Extract movie name into "highlightWord" if present
      - Extract director if mentioned
      - Extract total wins if mentioned
      - Keep response elegant and concise
    `);

    const formattedText = formattedResult.response.text();

    let parsed;
    try {
      parsed = JSON.parse(formattedText);
    } catch (e) {
      // fallback if parsing fails
      parsed = { text: rawText };
    }

    return NextResponse.json({ response: parsed });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}