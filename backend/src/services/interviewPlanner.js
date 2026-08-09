import {
  getDay
} from "./curriculumService.js";


export function createInterviewPlan(
  candidateAnalysis
) {

  const selectedDays = [];


  // =========================================
  // ADD TOPICS WITHOUT DUPLICATES
  // =========================================

  function addMissionTopics(missions) {

    for (const mission of missions || []) {

      // Never interview on skipped topics
      if (mission.skipped === true) {
        continue;
      }


      // Avoid duplicate curriculum days
      if (
        !selectedDays.includes(
          mission.day
        )
      ) {

        selectedDays.push(
          mission.day
        );

      }

    }

  }


  // =========================================
  // 1. WEAK AREAS
  // =========================================

  addMissionTopics(
    candidateAnalysis.weakAreas
  );


  // =========================================
  // 2. UNCERTAIN AREAS
  // =========================================

  addMissionTopics(
    candidateAnalysis.uncertainAreas
  );


  // =========================================
  // 3. STRONG AREAS
  // =========================================

  addMissionTopics(
    candidateAnalysis.strongAreas
  );


  // =========================================
  // 4. OTHER COMPLETED TOPICS
  //
  // This makes sure we have enough
  // curriculum days.
  // =========================================

  if (selectedDays.length < 4) {

    addMissionTopics(
      candidateAnalysis.completed
    );

  }


  // =========================================
  // 5. BUILD CURRICULUM PLAN
  // =========================================

  const plan = [];


  for (
    const dayNumber of selectedDays
  ) {

    const day =
      getDay(dayNumber);


    // Only add days that actually exist
    // in curriculum.json

    if (day) {

      plan.push({

        day:
          day.day,

        title:
          day.title,

        type:
          day.type,

        tools:
          day.tools || [],

        objectives:
          day.objectives || []

      });

    }


    // We need enough topics for
    // the interview.

    if (plan.length >= 8) {
      break;
    }

  }


  return plan;

}