function FeedbackPanel({
  feedback
}) {

  if (!feedback) {
    return null;
  }


  return (

    <div className="feedback-panel">

      <div className="feedback-title">

        <span className="feedback-icon">
          ✓
        </span>

        <div>

          <span className="eyebrow">
            INTERVIEW COMPLETE
          </span>

          <h2>
            Your Technical Feedback
          </h2>

        </div>

      </div>


      <section className="feedback-section">

        <h3>
          Overall Summary
        </h3>

        <p>
          {feedback.summary ||
            "No summary available."}
        </p>

      </section>


      <section className="feedback-section">

        <h3>
          Strengths
        </h3>

        {feedback.strengths?.length ? (

          <ul className="feedback-list">

            {feedback.strengths.map(
              (item, index) => (

                <li key={index}>
                  <span>✓</span>
                  {item}
                </li>

              )
            )}

          </ul>

        ) : (

          <p>
            No strengths were recorded.
          </p>

        )}

      </section>


      <section className="feedback-section">

        <h3>
          Areas to Improve
        </h3>

        {feedback.gaps?.length ? (

          <ul className="feedback-list gaps">

            {feedback.gaps.map(
              (item, index) => (

                <li key={index}>
                  <span>!</span>
                  {item}
                </li>

              )
            )}

          </ul>

        ) : (

          <p>
            No major gaps were identified.
          </p>

        )}

      </section>


      <section className="feedback-section">

        <h3>
          Recommended Next Steps
        </h3>

        {feedback.next?.length ? (

          <ul className="feedback-list next">

            {feedback.next.map(
              (item, index) => (

                <li key={index}>
                  <span>→</span>
                  {item}
                </li>

              )
            )}

          </ul>

        ) : (

          <p>
            Continue practicing technical
            interview scenarios.
          </p>

        )}

      </section>

    </div>

  );
}


export default FeedbackPanel;