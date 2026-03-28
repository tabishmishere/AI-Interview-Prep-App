export function getMockExplanation(questionText) {
  return {
    title: "Concept breakdown (preview)",
    explanation: `**Preview mode** — connect your API to replace this.\n\n**Question:** ${questionText}\n\nWhen integrated, the AI returns a structured explanation with examples. Use this panel for “deeper dive” content beside each Q&A.`,
  };
}
