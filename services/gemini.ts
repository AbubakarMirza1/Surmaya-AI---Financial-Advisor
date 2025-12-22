
import { GoogleGenAI, Type } from "@google/genai";
import { AppData, Screen } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getContextualAdvice(screen: Screen, data: AppData) {
    const prompt = `
      Context: User is on the ${screen} screen of their budget tracking app.
      User Data: ${JSON.stringify(data)}
      Current Economic Context: Pakistan (Consider inflation, FBR tax slabs, SBP interest rates, and cultural values like Zakat/Shariah compliance where relevant).
      
      Task: Provide a concise, professional, and ethical financial advice snippet. 
      If on DASHBOARD: General health check.
      If on TRANSACTIONS/SHOPPING: Comment on spending habits or suggest alternatives.
      If on GOALS: Suggest how much more to save monthly to hit the goal.
      If on LOANS: Advise on repayment priority.
      
      Return the response in JSON format.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advice: { type: Type.STRING },
              promptSuggestion: { type: Type.STRING, description: "A short question the user can click to ask more" },
              severity: { type: Type.STRING, enum: ["INFO", "WARNING", "SUCCESS"] }
            },
            required: ["advice", "promptSuggestion", "severity"]
          },
          systemInstruction: "You are 'Sarmaya AI', an expert financial advisor specializing in the Pakistani economy. You provide culturally sensitive, Shariah-aware (where applicable), and legally compliant advice based on SBP and FBR regulations."
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        advice: "Unable to connect to financial advisory servers at the moment. Please check your internet connection.",
        promptSuggestion: "Try again later",
        severity: "WARNING"
      };
    }
  }

  async chatWithAdvisor(message: string, data: AppData) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'Sarmaya AI'. Answer user queries about their finances: ${JSON.stringify(data)}. 
        Always relate back to the Pakistani context (PKR, local banks, inflation). 
        Be ethical, moral, and provide advice on things like FBR tax filing, Zakat calculation if asked, and Halal investment opportunities in Pakistan.`
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  }
}
