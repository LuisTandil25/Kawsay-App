
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askExpert = async (question: string, plantDetails?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un experto cultivador de cannabis siguiendo la metodología de J Kawsay (Cultivo en Coco). 
      Responde de forma concisa y profesional a la siguiente pregunta: ${question}. 
      Contexto actual de la planta: ${plantDetails || 'No especificado'}. 
      Enfócate en parámetros de pH, EC y nutrición mineral.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return "Lo siento, hubo un error conectando con el experto. Reintenta en unos momentos.";
  }
};

export const generateDailyPlan = async (plant: any) => {
    // Simplified logic to get advice for the specific stage
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Genera una lista de 3 tareas prioritarias para hoy para una planta de cannabis en etapa ${plant.stage} cultivada en Coco. Responde en formato JSON.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        task: { type: Type.STRING },
                        priority: { type: Type.STRING }
                    }
                }
            }
        }
    });
    return JSON.parse(response.text);
}
