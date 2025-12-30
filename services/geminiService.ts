
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string | null> => {
  try {
    const ai = getAIClient();
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/png',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Editing Error:", error);
    throw error;
  }
};

export const removeBackground = async (base64Image: string): Promise<string | null> => {
  return editImageWithGemini(base64Image, "Remove the background of this image and make it pure transparent or solid white. Keep only the main subject.");
};

export const enhanceImage = async (base64Image: string): Promise<string | null> => {
  return editImageWithGemini(base64Image, "Apply high-end professional photography retouching. Improve lighting, color balance, and sharpness while keeping it natural.");
};
