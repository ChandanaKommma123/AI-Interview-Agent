import { useState } from "react";

import Interview from "./pages/Interview.jsx";

import {
  demoCandidates
} from "./data/demoCandidates.js";

import "./App.css";


function App() {

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);


  return (
    <div className="app">

      {!selectedCandidate ? (

        <CandidateSelection
          candidates={demoCandidates}
          onSelect={setSelectedCandidate}
        />

      ) : (

        <Interview
          candidate={selectedCandidate}
          onBack={() =>
            setSelectedCandidate(null)
          }
        />

      )}

    </div>
  );
}


function CandidateSelection({
  candidates,
  onSelect
}) {

  return (

    <main className="candidate-page">

      <div className="candidate-container">

        <div className="brand-section">

          <div className="brand-icon">
            AI
          </div>

          <div>
            <h1>
              AI Technical Interview
            </h1>

            <p>
              Personalized technical interviews
              based on your AI Cohort journey.
            </p>
          </div>

        </div>


        <div className="selection-heading">

          <span className="eyebrow">
            INTERVIEW AGENT
          </span>

          <h2>
            Select a candidate
          </h2>

          <p>
            The interviewer will analyze the
            candidate's learning journey and
            create an adaptive technical interview.
          </p>

        </div>


        <div className="candidate-grid">

          {candidates.map(
            candidate => (

              <button
                key={candidate.member.id}
                className="candidate-card"
                onClick={() =>
                  onSelect(candidate)
                }
              >

                <div className="candidate-avatar">

                  {candidate.member.name
                    .charAt(0)
                    .toUpperCase()}

                </div>


                <div className="candidate-info">

                  <h3>
                    {candidate.member.name}
                  </h3>

                  <p className="candidate-role">
                    {candidate.member.jobRole}
                  </p>

                  <p className="candidate-experience">
                    {candidate.member.yearsExperience}
                    {" "}
                    years experience
                  </p>

                </div>


                <div className="candidate-arrow">
                  →
                </div>

              </button>

            )
          )}

        </div>


        <div className="selection-note">

          <span>✦</span>

          Questions are generated dynamically
          from the candidate's curriculum progress.

        </div>

      </div>

    </main>

  );
}


export default App;