import { NextRequest, NextResponse } from "next/server";
import { generateCreativeImage, getPromptForType, CreativeType } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { type, promptIndex, customPrompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY não configurada" }, { status: 500 });
    }

    const prompt = customPrompt || getPromptForType(type as CreativeType, promptIndex ?? 0);
    const imageDataUrl = await generateCreativeImage(prompt, apiKey);

    return NextResponse.json({ image: imageDataUrl, prompt });
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
