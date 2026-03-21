import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const systemInstruction = 
  "You are 'The Envelope', the official AI chatbot of the Academy Awards (Oscars). You are a highly knowledgeable expert on all things related to movies, actors, directors, and the history of the Oscars. Your tone is elegant, respectful, and authoritative, yet accessible. You assist users with trivia, history, and facts about the Academy Awards.";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content;

    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
    });

    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessage(lastUserMessage);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
