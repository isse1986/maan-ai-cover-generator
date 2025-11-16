
import { GoogleGenAI } from "@google/genai";
import { TemplateDetails } from "../types";

export const generateCoverArt = async (
  title: string,
  author: string,
  genre: string,
  template: TemplateDetails
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Create a professional, high-resolution background artwork for a book cover. The book is a ${genre} novel.
    The title is "${title}" and the author is "${author}".

    Key visual elements and mood for a ${genre} book:
    - For "Science Fiction": futuristic cityscapes, spaceships, alien planets, advanced technology, nebulae. Mood: wondrous, sterile, dystopian, or epic.
    - For "Fantasy": enchanted forests, mythical creatures, castles, magic symbols, epic landscapes. Mood: magical, adventurous, dark, or whimsical.
    - For "Romance": evocative landscapes, a couple in silhouette, a single meaningful object (like a flower or letter), soft lighting. Mood: intimate, passionate, sweet, or heartbreaking.
    - For "Thriller" or "Mystery": dark alleys, shadowy figures, forensic evidence, stark urban environments, isolated locations. Mood: tense, suspenseful, ominous, gritty.
    - For "Horror": dilapidated houses, creepy forests, monstrous entities, unsettling objects, high contrast lighting. Mood: terrifying, dreadful, eerie.
    - For "Historical Fiction": period-appropriate settings, clothing, and objects. Mood: nostalgic, dramatic, grand, or somber.
    
    The composition must be visually striking and suitable for a book cover.
    Crucially, it must have significant negative space, especially in the top third and bottom third of the frame. This space is where the title and author's name will be overlaid later.
    The design should have a clear focal point but avoid being overly cluttered.

    ABSOLUTELY DO NOT include any text, letters, words, or typography in the generated image. This is for the background art ONLY.
    The image must be photorealistic or have a high-quality digital painting style.
  `;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: template.aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating cover art with Gemini API:", error);
    throw new Error("Failed to generate cover art. Please try again.");
  }
};
