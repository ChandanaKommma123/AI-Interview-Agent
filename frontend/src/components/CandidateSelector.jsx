function CandidateSelector({
  candidates,
  onSelect
}) {

  return (
    <main className="home-page">

      <div className="home-container">

        <span className="home-eyebrow">
          INTERVIEW AGENT
        </span>

        <h1 className="home-title">
          Select a candidate
        </h1>

        <p className="home-subtitle">
          The AI interviewer analyzes the candidate's
          learning journey and conducts a personalized
          technical interview based on completed
          curriculum topics.
        </p>


        <div className="candidate-selector">

          <div className="candidate-grid">

            {candidates.map((candidate) => {

              const name =
                candidate.member.name;

              return (

                <button
                  key={candidate.member.id}
                  className="candidate-card"
                  onClick={() =>
                    onSelect(candidate)
                  }
                >

                  <div className="candidate-avatar">
                    {name
                      .charAt(0)
                      .toUpperCase()}
                  </div>


                  <h3 className="candidate-name">
                    {name}
                  </h3>


                  <span className="candidate-role">
                    {candidate.member.jobRole}
                  </span>


                  <span className="candidate-meta">
                    {candidate.member.yearsExperience}
                    {" "}
                    years experience
                  </span>


                  <span className="candidate-arrow">
                    →
                  </span>

                </button>

              );
            })}

          </div>

        </div>

      </div>

    </main>
  );
}

export default CandidateSelector;