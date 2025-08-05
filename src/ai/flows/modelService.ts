// src/components/ai/modelService.ts

const NGROK_BASE_URL = "https://8e23970b6b45.ngrok-free.app/generate"; // ✅ HTTPS!

class ModelService {
  constructor() {
    this.baseUrl = NGROK_BASE_URL;
  }

  async generateResponse(prompt: string, userRole = "Security Analyst") {
    try {
      const res = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          prompt,
          role: userRole
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const data = await res.json();
      return data.response;
    } catch (error) {
      console.error("ModelService error:", error);
      return `⚠️ Error: Could not generate response. Check model backend or network.`;
    }
  }

  async testConnection() {
    try {
      const res = await fetch(`${this.baseUrl}/`);
      return res.ok;
    } catch (err) {
      console.warn("Backend not reachable");
      return false;
    }
  }
}

export const modelService = new ModelService();
