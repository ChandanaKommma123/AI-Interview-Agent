import {
  generateText
} from "../services/llmService.js";


export async function generateInterviewQuestion({
  candidateAnalysis,
  curriculumTopic,
  questionNumber,
  previousConversation
}) {

  const conversationText =
    (previousConversation || [])
      .map(
        message =>
          `${message.role}: ${message.content}`
      )
      .join("\n");


  const prompt = `

You are a senior technical interviewer conducting
a realistic technical interview.

You are interviewing a candidate who completed
an AI engineering cohort.

The interview must be based ONLY on curriculum
topics that this candidate actually completed.

-----------------------------------------
CANDIDATE
-----------------------------------------

Name:
${candidateAnalysis.name}

Role:
${candidateAnalysis.jobRole}

Experience:
${candidateAnalysis.yearsExperience} years


-----------------------------------------
CURRENT CURRICULUM TOPIC
-----------------------------------------

Day:
${curriculumTopic.day}

Topic:
${curriculumTopic.title}

Type:
${curriculumTopic.type}

Tools:
${(curriculumTopic.tools || []).join(", ")}

Learning objectives:
${(curriculumTopic.objectives || [])
  .map(objective => `- ${objective}`)
  .join("\n")}


-----------------------------------------
PREVIOUS CONVERSATION
-----------------------------------------

${conversationText || "No previous conversation."}


-----------------------------------------
QUESTION NUMBER
-----------------------------------------

${questionNumber}


-----------------------------------------
INTERVIEWER BEHAVIOR
-----------------------------------------

Generate ONE interview question.

The question MUST be directly related to the
current curriculum topic and its learning
objectives.

The candidate has actually completed this
curriculum topic.

Prefer realistic engineering questions over
simple definition questions.

Depending on the topic, ask about:

- implementation
- architecture
- system design
- debugging
- engineering decisions
- trade-offs
- practical scenarios
- production considerations
- tools used in the curriculum

The difficulty should be appropriate for the
candidate's role and experience.

If the previous candidate answer shows weak,
incomplete, vague, or incorrect understanding,
ask a focused follow-up question instead of
immediately changing topics.

If the previous answer is strong, you may move
to a deeper aspect of the same topic or proceed
to the next curriculum topic.

Do not repeat a question that has already been
asked.

Do not ask about a curriculum day that is not
represented by the current curriculum topic.

Do not invent candidate experience that is not
present in the supplied candidate data.

Return ONLY the question.

Do not return:
- explanations
- labels
- "Question:"
- markdown
- JSON
- scoring
- feedback

`;


  const question =
    await generateText(prompt);


  if (!question) {

    throw new Error(
      "Interviewer agent returned an empty question."
    );

  }


  return question.trim();

}