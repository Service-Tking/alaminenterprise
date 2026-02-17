
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export const getErpInsights = async (module: string, data: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze the following ERP ${module} data and provide a brief professional summary with 3 actionable insights: ${JSON.stringify(data)}`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate insights at this time.";
  }
};

export const searchPartsByFirstWord = (term: string, products: Product[]): Product[] => {
  if (!term) return [];
  const lowerTerm = term.toLowerCase();
  
  // Logic: Matches starting with the first word, or SKU starting with term
  return products.filter(p => {
    const nameWords = p.name.toLowerCase().split(' ');
    return (
      p.name.toLowerCase().startsWith(lowerTerm) || 
      (nameWords.length > 0 && nameWords[0].startsWith(lowerTerm)) ||
      p.sku.toLowerCase().startsWith(lowerTerm)
    );
  }).slice(0, 10);
};

export const generateJobCardDescription = async (complaints: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `As an expert vehicle engineer, expand these brief vehicle complaints into a professional technical job description: ${complaints}`,
    });
    return response.text;
  } catch (error) {
    return complaints;
  }
};
