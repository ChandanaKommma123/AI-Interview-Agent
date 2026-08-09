import { analyzeCandidate } from "../services/candidateAnalyzer.js";
import { createInterviewPlan } from "../services/interviewPlanner.js";

import {
  createSession,
  getSession,
  updateSession
} from "../state/interviewStore.js";

import {
  generateInterviewQuestion
} from "../agents/interviewerAgent.js";

import {
  evaluateAnswer
} from "../agents/evaluatorAgent.js";

import {
  generateFeedback
} from "../agents/feedbackAgent.js";


export async function handleInterview(req, res) {

  console.log(
    "Interview request received:",
    req.body
  );

  try {

    const {
      sessionId,
      candidate,
      message
    } = req.body;


    // =========================================
    // VALIDATE SESSION
    // =========================================

    if (!sessionId) {

      return res.status(400).json({
        error: "sessionId is required"
      });

    }


    // =========================================
    // START INTERVIEW
    // =========================================

    if (!message) {

      if (!candidate) {

        return res.status(400).json({
          error:
            "candidate is required for the first request"
        });

      }


      // -----------------------------------------
      // ANALYZE CANDIDATE
      // -----------------------------------------

      const candidateAnalysis =
        analyzeCandidate(candidate);

      console.log(
        "Candidate analysis:",
        candidateAnalysis
      );


      // -----------------------------------------
      // CREATE INTERVIEW PLAN
      // -----------------------------------------

      const interviewPlan =
        createInterviewPlan(
          candidateAnalysis
        );

      console.log(
        "Interview plan:",
        interviewPlan
      );


      // -----------------------------------------
      // SAFETY CHECK
      // -----------------------------------------

      if (
        !interviewPlan ||
        interviewPlan.length === 0
      ) {

        return res.status(500).json({
          error:
            "Could not create interview plan."
        });

      }


      const state = {

        sessionId,

        candidate,

        candidateAnalysis,

        interviewPlan,

        currentTopicIndex: 0,

        questionNumber: 1,

        currentQuestion: null,

        conversation: [],

        evaluations: [],

        coveredDays: [],

        status: "in_progress"

      };


      // -----------------------------------------
      // FIRST TOPIC
      // -----------------------------------------

      const firstTopic =
        interviewPlan[0];

      console.log(
        "First curriculum topic:",
        firstTopic
      );


      // -----------------------------------------
      // GENERATE FIRST QUESTION
      // -----------------------------------------

      const firstQuestion =
        await generateInterviewQuestion({

          candidateAnalysis,

          curriculumTopic:
            firstTopic,

          questionNumber: 1,

          previousConversation: []

        });


      console.log(
        "First question generated:",
        firstQuestion
      );


      // -----------------------------------------
      // STORE QUESTION
      // -----------------------------------------

      state.currentQuestion =
        firstQuestion;


      state.conversation.push({

        role: "interviewer",

        content: firstQuestion

      });


      state.coveredDays.push(
        firstTopic.day
      );


      createSession(
        sessionId,
        state
      );


      console.log(
        "Interview session created:",
        sessionId
      );


      return res.json({
        reply: firstQuestion,
        done: false,
        questionNumber: state.questionNumber,
        coveredDays: state.coveredDays
      });

    }


    // =========================================
    // CONTINUE INTERVIEW
    // =========================================

    const state =
      getSession(sessionId);


    console.log(
      "Existing session:",
      state ? "FOUND" : "NOT FOUND"
    );


    if (!state) {

      return res.status(404).json({

        error:
          "Interview session not found"

      });

    }


    // -----------------------------------------
    // CURRENT TOPIC
    // -----------------------------------------

    const currentTopic =
      state.interviewPlan[
        state.currentTopicIndex
      ];


    console.log(
      "Current topic:",
      currentTopic
    );


    // -----------------------------------------
    // STORE CANDIDATE ANSWER
    // -----------------------------------------

    state.conversation.push({

      role: "candidate",

      content: message

    });


    // -----------------------------------------
    // EVALUATE ANSWER
    // -----------------------------------------

    const evaluation =
      await evaluateAnswer({

        question:
          state.currentQuestion,

        answer:
          message,

        curriculumTopic:
          currentTopic

      });


    console.log(
      "Answer evaluation:",
      evaluation
    );


    state.evaluations.push({

      questionNumber:
        state.questionNumber,

      topic:
        currentTopic.title,

      day:
        currentTopic.day,

      question:
        state.currentQuestion,

      answer:
        message,

      evaluation

    });


// =========================================
// DECIDE NEXT QUESTION
// =========================================

const shouldFollowUp =
  evaluation.followUpNeeded &&
  state.questionNumber % 2 === 1 &&
  state.questionNumber < 8;

console.log(
  "Follow-up needed:",
  shouldFollowUp
);


// =========================================
// FOLLOW-UP QUESTION
// =========================================

if (shouldFollowUp) {

  // Stay on the same curriculum topic.

  console.log(
    "Staying on current curriculum topic for follow-up."
  );

}


// =========================================
// MOVE TO NEXT CURRICULUM DAY
// =========================================

else {

  // Find a curriculum topic that has
  // NOT been covered yet.

  const nextUncoveredIndex =
    state.interviewPlan.findIndex(
      topic =>
        !state.coveredDays.includes(topic.day)
    );


  if (nextUncoveredIndex !== -1) {

    state.currentTopicIndex =
      nextUncoveredIndex;

    console.log(
      "Moving to new curriculum day:",
      state.interviewPlan[
        nextUncoveredIndex
      ].day
    );

  }

}


// =========================================
// INCREASE QUESTION NUMBER
// =========================================

state.questionNumber++;

console.log(
  "Next question number:",
  state.questionNumber
);

    // =========================================
// END INTERVIEW
// =========================================

if (state.questionNumber > 8) {

  const uniqueDays = [
    ...new Set(state.coveredDays)
  ];

  console.log(
    "Interview reached 8 questions."
  );

  console.log(
    "Covered curriculum days:",
    uniqueDays
  );


  // We require at least 4 different
  // curriculum days.

  if (uniqueDays.length < 4) {

    console.error(
      "Interview reached 8 questions but fewer than 4 curriculum days were covered."
    );

    return res.status(500).json({

      error:
        "Interview could not satisfy the minimum curriculum coverage requirement."

    });

  }


  console.log(
    "Generating final feedback..."
  );


  const feedback =
    await generateFeedback({

      candidateAnalysis:
        state.candidateAnalysis,

      evaluations:
        state.evaluations,

      coveredTopics:
        state.coveredDays

    });


  console.log(
    "Final feedback:",
    feedback
  );


  state.status =
    "completed";


  updateSession(
    sessionId,
    state
  );


  return res.json({

    reply:
      "Thank you. That concludes your interview.",

    done: true,

    questionNumber: 8,

    coveredDays:
      state.coveredDays,

    feedback

  });

}

    // =========================================
    // GENERATE NEXT QUESTION
    // ======
    // ===================================

    const nextTopic =
      state.interviewPlan[
        state.currentTopicIndex
      ];


    console.log(
      "Next curriculum topic:",
      nextTopic
    );


    if (
      !state.coveredDays.includes(
        nextTopic.day
      )
    ) {

      state.coveredDays.push(
        nextTopic.day
      );

    }


    const nextQuestion =
      await generateInterviewQuestion({

        candidateAnalysis:
          state.candidateAnalysis,

        curriculumTopic:
          nextTopic,

        questionNumber:
          state.questionNumber,

        previousConversation:
          state.conversation

      });


    console.log(
      "Next question generated:",
      nextQuestion
    );


    state.currentQuestion =
      nextQuestion;


    state.conversation.push({

      role: "interviewer",

      content: nextQuestion

    });


    updateSession(
      sessionId,
      state
    );


    return res.json({

      reply: nextQuestion,

      done: false,

      questionNumber:
        state.questionNumber,

      coveredDays:
        state.coveredDays

    });


  } catch (error) {

    console.error(
      "Interview error:",
      error
    );


    return res.status(500).json({

      error:
        "Interview processing failed."

    });

  }

}