export interface AIAdapter {
  generateInsight(data: any): Promise<string>;
  analyzeForm(videoUrl: string): Promise<any>;
}

// Placeholder for future AI implementation (e.g. OpenAI, Anthropic)
export const aiAdapter: AIAdapter = {
  generateInsight: async () => "Based on your MELD score, your recovery is on track.",
  analyzeForm: async () => ({ score: 85, suggestions: ["Keep your back straight"] })
};
