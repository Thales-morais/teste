export type CreativeType = "post" | "story" | "banner" | "presentation" | "ad" | "cover";

const brandContext = `
Brand: Criatis - a creative design agency.
Brand colors: deep purple (#7C3AED), royal blue (#2563EB), vibrant orange (#F97316).
Style: modern, dark background, gradient accents, minimal clean layout, professional creative agency aesthetic.
Always dark background. High contrast. Premium look.
`;

export const creativePrompts: Record<CreativeType, string[]> = {
  post: [
    `${brandContext} Square social media post (1:1), dark background #06060F, large bold headline text area, purple to blue gradient accent bar on left, subtle grid pattern, space for brand logo top-left corner, modern typography layout, professional Instagram post template`,
    `${brandContext} Instagram feed post, dark moody background, diagonal purple-to-orange gradient element, centered headline composition, minimalist design with geometric shapes, creative agency branding post`,
    `${brandContext} Social media post template, split layout with dark left side and subtle gradient right side, bold typography placeholder, orange accent shapes, Criatis brand style`,
  ],
  story: [
    `${brandContext} Vertical story template 9:16, full dark background, large centered text area with purple gradient overlay at top, small logo space at bottom, swipe up CTA button area, modern Instagram story design`,
    `${brandContext} Vertical social media story, dramatic dark background with purple and blue light leaks from top corners, centered bold text zone, bottom action area, premium creative agency story template`,
    `${brandContext} Instagram story template, dark background with glowing orange circle element top-right, large headline space, minimal clean layout, Criatis brand aesthetic`,
  ],
  banner: [
    `${brandContext} Wide digital banner 16:9, dark background with purple to blue gradient left panel, white text content area right, logo zone top-left, CTA button bottom-right, professional web banner template`,
    `${brandContext} Hero banner template, dark dramatic background, large display text placeholder, orange accent underline, subtle particle dots background texture, creative agency website banner`,
    `${brandContext} Digital advertising banner, split dark composition, bold headline area with gradient text effect, product/image placeholder zone, strong CTA area, Criatis brand style`,
  ],
  presentation: [
    `${brandContext} Presentation slide cover, dark background, large centered title text area, full-width purple to blue gradient accent bar at bottom, top-left logo position, white typography, professional business presentation`,
    `${brandContext} PowerPoint/Keynote slide template, dark theme, left purple gradient sidebar, main content area right, heading and body text zones, corporate creative presentation layout`,
    `${brandContext} Presentation title slide, dramatic dark background with subtle geometric mesh pattern, large bold headline center, subtitle below, gradient logo mark top-left, premium agency presentation`,
  ],
  ad: [
    `${brandContext} Digital ad template 300x250, dark background, product image placeholder top, headline text middle, orange CTA button bottom, purple brand stripe left edge, display advertising format`,
    `${brandContext} Facebook/Meta ad template, dark card design, compelling headline area, body text zone, strong orange call-to-action button, Criatis branding corner, social media advertisement`,
    `${brandContext} Google display ad, clean dark layout, bold headline, subtext, prominent purple CTA button, brand logo corner, professional digital advertising creative`,
  ],
  cover: [
    `${brandContext} LinkedIn or Facebook cover photo 16:9, dark premium background, large bold company name area, purple gradient on left third, abstract creative shapes, professional business cover photo template`,
    `${brandContext} YouTube channel art, wide dark background, centered channel name area, purple and blue accent elements, modern creative agency channel banner`,
    `${brandContext} Social media profile cover, dark elegant background, purple to orange gradient accent diagonal, brand name large text area, professional cover photo layout`,
  ],
};

export function getPromptForType(type: CreativeType, index = 0): string {
  const prompts = creativePrompts[type];
  return prompts[index % prompts.length];
}

export async function generateCreativeImage(
  prompt: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts;

  for (const part of parts ?? []) {
    if (part.inlineData?.mimeType?.startsWith("image/")) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Nenhuma imagem retornada pela API");
}
