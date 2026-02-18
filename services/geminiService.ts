
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

/**
 * Enhanced Search Logic
 * Priority 1: Prefix matching (1st letter logic)
 * Priority 2: SKU prefix matching
 */
export const searchPartsByFirstWord = (term: string, products: Product[]): Product[] => {
  if (!term || term.trim() === '') return [];
  const lowerTerm = term.toLowerCase().trim();
  
  return products.filter(p => {
    const nameLower = p.name.toLowerCase();
    const skuLower = p.sku.toLowerCase();
    
    // Check if whole name starts with term OR any word in the name starts with the term
    const nameStarts = nameLower.startsWith(lowerTerm);
    const wordStarts = nameLower.split(' ').some(word => word.startsWith(lowerTerm));
    const skuStarts = skuLower.startsWith(lowerTerm);
    
    return nameStarts || wordStarts || skuStarts;
  }).slice(0, 15); // Return top 15 results for performance
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
