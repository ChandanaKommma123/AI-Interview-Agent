import { generateText } from "../services/llmService.js";

export async function generateFeedback({
  candidateAnalysis,
  evaluations,
  coveredTopics
}) {

  const prompt = `
You are generating final technical interview feedback.

Candidate:
${candidateAnalysis.name}

Role:
${candidateAnalysis.jobRole}

Experience:
${candidateAnalysis.yearsExperience}

Covered curriculum topics:
${JSON.stringify(coveredTopics)}

Interview evaluations:
${JSON.stringify(evaluations)}

Generate concise actionable feedback.

Return ONLY valid JSON:

{
  "summary": "",
  "strengths": [],
  "gaps": [],
  "next": []
}

Rules:

summary:
Give an overall assessment.

strengths:
Mention the strongest technical areas demonstrated.

gaps:
Mention areas where the candidate lacked depth or made mistakes.

next:
Give specific things the candidate should study or practice next.

Do not invent topics outside the supplied curriculum.
`;

  const result = await generateText(prompt);

  console.log("Raw feedback response:", result);

  try {
    const cleanedResult = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResult);

  } catch (error) {

    console.error(
      "Feedback JSON parsing failed:",
      error
    );

    console.error(
      "Raw feedback:",
      result
    );

    return {
      summary: "Interview completed.",
      strengths: [],
      gaps: [],
      next: []
    };
  }
}