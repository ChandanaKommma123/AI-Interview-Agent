function AnswerInput({
  answer,
  setAnswer,
  onSubmit,
  loading
}) {

  function handleKeyDown(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      onSubmit();

    }
  }

  return (
    <div className="answer-section">

      <div className="answer-header">

        <span>
          YOUR ANSWER
        </span>

        <span>
          Enter to submit · Shift + Enter for new line
        </span>

      </div>


      <div className="answer-box">

        <textarea
          value={answer}
          onChange={(event) =>
            setAnswer(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Explain your approach clearly. Include technical reasoning, trade-offs, implementation details, or examples..."
        />


        <div className="answer-footer">

          <span className="answer-hint">
            Be specific. Think like you're explaining this to a senior engineer.
          </span>

          <button
            className="submit-button"
            onClick={onSubmit}
            disabled={
              loading ||
              !answer.trim()
            }
          >

            {loading
              ? "Evaluating..."
              : "Submit Answer →"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default AnswerInput;