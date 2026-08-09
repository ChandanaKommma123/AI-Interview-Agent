export function analyzeCandidate(candidate) {

  const missions =
    candidate?.missions || [];

  // Missions that were successfully completed
  const completed =
    missions.filter(
      mission =>
        mission.passed === true &&
        mission.skipped !== true
    );

  // Missions that were attempted but not passed
  const failed =
    missions.filter(
      mission =>
        mission.passed === false
    );

  // Topics explicitly skipped
  const skipped =
    missions.filter(
      mission =>
        mission.skipped === true
    );

  // Completed on the first attempt
  const strongAreas =
    completed.filter(
      mission =>
        (mission.attempts || 1) === 1
    );

  // Completed but required multiple attempts
  const uncertainAreas =
    completed.filter(
      mission =>
        (mission.attempts || 1) >= 2
    );

  // Failed topics
  const weakAreas =
    failed;

  return {

    candidateId:
      candidate?.member?.id,

    name:
      candidate?.member?.name,

    jobRole:
      candidate?.member?.jobRole,

    yearsExperience:
      candidate?.member?.yearsExperience,

    completed,

    failed,

    skipped,

    strongAreas,

    uncertainAreas,

    weakAreas

  };
}