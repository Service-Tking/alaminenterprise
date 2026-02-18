
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
 * Requirement: 1st character/word dropdown search.
 * Filters products from the local registry based on prefix matching.
 */
export const searchPartsByFirstWord = (term: string, products: Product[]): Product[] => {
  if (!term || term.trim() === '') return [];
  const lowerTerm = term.toLowerCase();
  
  return products.filter(p => {
    const nameLower = p.name.toLowerCase();
    const skuLower = p.sku.toLowerCase();
    
    // Priority 1: Name starts with the term (1st character typed logic)
    const matchesNamePrefix = nameLower.startsWith(lowerTerm);
    
    // Priority 2: SKU starts with the term
    const matchesSkuPrefix = skuLower.startsWith(lowerTerm);
    
    // Priority 3: Any word in the name starts with the term
    const matchesWordPrefix = nameLower.split(' ').some(word => word.startsWith(lowerTerm));
    
    return matchesNamePrefix || matchesSkuPrefix || matchesWordPrefix;
  }).slice(0, 15);
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
