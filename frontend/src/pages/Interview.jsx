import {
  useState
} from "react";

import {
  startInterview,
  sendAnswer
} from "../services/interviewApi.js";

import InterviewHeader
  from "../components/InterviewHeader.jsx";

import InterviewChat
  from "../components/InterviewChat.jsx";

import FeedbackPanel
  from "../components/FeedbackPanel.jsx";

import AnswerInput
from "../components/AnswerInput.jsx";

const MAX_QUESTIONS = 8;


function Interview({
  candidate,
  onBack
}) {

  const [
    sessionId
  ] = useState(
    () => crypto.randomUUID()
  );


  const [
    messages,
    setMessages
  ] = useState([]);


  const [
    answer,
    setAnswer
  ] = useState("");


  const [
    started,
    setStarted
  ] = useState(false);


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    done,
    setDone
  ] = useState(false);


  const [
    feedback,
    setFeedback
  ] = useState(null);


  const [
    questionNumber,
    setQuestionNumber
  ] = useState(0);


  const [
    coveredDays,
    setCoveredDays
  ] = useState([]);


  const [
    error,
    setError
  ] = useState("");


  // =========================================
  // START INTERVIEW
  // =========================================

  async function handleStart() {

    try {

      setLoading(true);

      setError("");


      const result =
        await startInterview(
          sessionId,
          candidate
        );


      setMessages([
        {
          role: "interviewer",
          content: result.reply
        }
      ]);


      setQuestionNumber(
        result.questionNumber || 1
      );


      setCoveredDays(
        result.coveredDays || []
      );


      setStarted(true);

    } catch (error) {

      console.error(
        "Start interview error:",
        error
      );


      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }


  // =========================================
  // SUBMIT ANSWER
  // =========================================

  async function handleSubmit() {

    const trimmedAnswer =
      answer.trim();


    if (
      !trimmedAnswer ||
      loading ||
      done
    ) {

      return;

    }


    setMessages(prev => [

      ...prev,

      {
        role: "candidate",
        content: trimmedAnswer
      }

    ]);


    setAnswer("");

    setLoading(true);

    setError("");


    try {

      const result =
        await sendAnswer(
          sessionId,
          trimmedAnswer
        );


      if (result.reply) {

        setMessages(prev => [

          ...prev,

          {
            role: "interviewer",
            content:
              result.reply
          }

        ]);

      }


      if (
        result.questionNumber
      ) {

        setQuestionNumber(
          result.questionNumber
        );

      }


      if (
        result.coveredDays
      ) {

        setCoveredDays(
          result.coveredDays
        );

      }


      if (result.done) {

        setDone(true);

        setFeedback(
          result.feedback
        );

      }

    } catch (error) {

      console.error(
        "Submit answer error:",
        error
      );


      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }


  // =========================================
  // ENTER KEY HANDLER
  // =========================================

  function handleKeyDown(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      handleSubmit();

    }

  }


  // =========================================
  // BEFORE INTERVIEW
  // =========================================

  if (!started) {

    return (

      <main className="interview-page">

        <div className="interview-start-card">

          <button
            className="back-button start-back"
            onClick={onBack}
          >
            ← Back
          </button>


          <div className="start-icon">
            AI
          </div>


          <span className="eyebrow">
            PERSONALIZED INTERVIEW
          </span>


          <h1>
            Ready to begin?
          </h1>


          <p>
            Your interview will be generated
            dynamically from {candidate.member.name}'s
            learning journey.
          </p>


          <div className="candidate-preview">

            <div className="preview-avatar">

              {candidate.member.name
                .charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <strong>
                {candidate.member.name}
              </strong>

              <span>
                {candidate.member.jobRole}
                {" · "}
                {candidate.member.yearsExperience}
                {" years"}
              </span>

            </div>

          </div>


          <div className="interview-rules">

            <div>
              <span>✓</span>
              Adaptive technical questions
            </div>

            <div>
              <span>✓</span>
              Follow-up questions based on answers
            </div>

            <div>
              <span>✓</span>
              Multiple curriculum areas
            </div>

            <div>
              <span>✓</span>
              Detailed feedback at the end
            </div>

          </div>


          {error && (

            <div className="error-message">
              {error}
            </div>

          )}


          <button
            className="primary-button"
            onClick={handleStart}
            disabled={loading}
          >

            {loading
              ? "Preparing interview..."
              : "Start Interview →"}

          </button>

        </div>

      </main>

    );

  }


  // =========================================
  // COMPLETED INTERVIEW
  // =========================================

  if (done) {

    return (

      <main className="interview-page">

        <div className="completed-container">

          <InterviewChat
            messages={messages}
          />


          <FeedbackPanel
            feedback={feedback}
          />


          <button
            className="secondary-button"
            onClick={onBack}
          >
            Start Another Interview
          </button>

        </div>

      </main>

    );

  }


  // =========================================
// ACTIVE INTERVIEW
// =========================================

return (

  <main className="interview-page">

    <InterviewHeader
      candidate={candidate}
      questionNumber={questionNumber}
      maxQuestions={MAX_QUESTIONS}
      coveredDays={coveredDays}
      onBack={onBack}
    />


    <div className="interview-layout">


      {/* =====================================
          LEFT SIDEBAR
      ===================================== */}

      <aside className="interview-sidebar">


        {/* Candidate */}

        <div className="sidebar-section">

          <div className="sidebar-label">
            Candidate
          </div>


          <div className="profile-card">

            <div className="profile-top">

              <div className="profile-avatar">

                {candidate.member.name
                  .charAt(0)
                  .toUpperCase()}

              </div>


              <div>

                <div className="profile-name">

                  {candidate.member.name}

                </div>


                <div className="profile-role">

                  {candidate.member.jobRole}

                </div>

              </div>

            </div>


            <div className="profile-experience">

              {candidate.member.yearsExperience}
              {" "}
              years experience

            </div>

          </div>

        </div>


        {/* Curriculum */}

        <div className="sidebar-section">

          <div className="sidebar-label">
            Curriculum Coverage
          </div>


          <div className="curriculum-list">

            {coveredDays.map(
              (day) => (

                <div
                  key={day}
                  className="curriculum-item covered"
                >

                  <span className="curriculum-check">
                    ✓
                  </span>

                  Day {day}

                </div>

              )
            )}


            {coveredDays.length === 0 && (

              <div className="curriculum-item">

                No topics covered yet

              </div>

            )}

          </div>

        </div>


        {/* Progress */}

        <div className="sidebar-section">

          <div className="sidebar-label">
            Interview Progress
          </div>


          <div className="progress-card">

            <div className="progress-header">

              <span>
                Progress
              </span>


              <span className="progress-number">

                {Math.min(
                  questionNumber,
                  MAX_QUESTIONS
                )}
                /
                {MAX_QUESTIONS}

              </span>

            </div>


            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${Math.min(
                      (questionNumber /
                        MAX_QUESTIONS) *
                      100,
                      100
                    )}%`
                }}
              />

            </div>

          </div>

        </div>

      </aside>


            {/* =====================================
          RIGHT SIDE — INTERVIEW
      ===================================== */}

      <section className="interview-main">

        <InterviewChat
          messages={messages}
        />

        {error && (
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 45px"
            }}
          >
            <div className="error-message">
              {error}
            </div>
          </div>
        )}

        <AnswerInput
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={handleSubmit}
          loading={loading}
        />

      </section>

    </div>

  </main>

);

}

export default Interview;