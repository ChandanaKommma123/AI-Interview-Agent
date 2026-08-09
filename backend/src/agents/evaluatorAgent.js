import { generateText } from "../services/llmService.js";

export async function evaluateAnswer({
  question,
  answer,
  curriculumTopic
}) {

  const prompt = `
You are evaluating a candidate's answer during a technical interview.

Curriculum topic:
Day ${curriculumTopic.day}
${curriculumTopic.title}

Learning objectives:
${curriculumTopic.objectives.join("\n")}

Question:
${question}

Candidate answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON:

{
  "score": 0,
  "correctness": "correct|mostly_correct|partially_correct|incorrect",
  "depth": "basic|moderate|deep",
  "reasoning": "weak|moderate|strong",
  "missingConcepts": [],
  "misconceptions": [],
  "followUpNeeded": true,
  "followUpReason": ""
}

Scoring:
0-2 = incorrect
3-4 = weak
5-6 = moderate
7-8 = good
9-10 = excellent
`;

  const result = await generateText(prompt);

  try {
    return JSON.parse(result);
  } catch (error) {
    console.error("Failed to parse evaluator response:", result);

    return {
      score: 5,
      correctness: "partially_correct",
      depth: "moderate",
      reasoning: "moderate",
      missingConcepts: [],
      misconceptions: [],
      followUpNeeded: true,
      followUpReason: "Could not parse evaluation."
    };
  }
}