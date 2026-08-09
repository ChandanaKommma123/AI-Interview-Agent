function InterviewHeader({
  candidate,
  questionNumber,
  maxQuestions,
  coveredDays = [],
  onBack
}) {
  const name =
    candidate?.member?.name || "Candidate";

  const role =
    candidate?.member?.jobRole || "AI Engineer";

  const progress =
    Math.min(
      (questionNumber / maxQuestions) * 100,
      100
    );

  return (
    <header className="interview-header">

      <div className="header-left">

        <button
          className="header-back"
          onClick={onBack}
          title="Back"
        >
          ←
        </button>

        <div className="header-brand">

          <div className="header-title">
            AI Technical Interview
          </div>

          <div className="header-candidate">
            {name} · {role}
          </div>

        </div>

      </div>


      <div
        style={{
          width: "280px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
            fontSize: "11px",
            color: "#73778a"
          }}
        >

          <span>
            Question {questionNumber} / {maxQuestions}
          </span>

          <span>
            {coveredDays.length} days covered
          </span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

      </div>


      <div className="header-status">

        <span className="status-dot" />

        LIVE

      </div>

    </header>
  );
}

export default InterviewHeader;