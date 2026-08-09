import MessageBubble from "./MessageBubble.jsx";

function InterviewChat({ messages = [] }) {

  return (
    <div className="chat-container">

      {messages.map(
        (message, index) => (

          <div
            key={index}
            className={`message-row ${message.role}`}
          >

            {message.role === "interviewer" && (

              <div className="ai-avatar">
                AI
              </div>

            )}

            <div className="message-content">

              <div className="message-label">

                {message.role === "interviewer"
                  ? "AI INTERVIEWER"
                  : "YOU"}

              </div>

              <MessageBubble
                role={message.role}
                content={message.content}
              />

            </div>

          </div>

        )
      )}

    </div>
  );
}

export default InterviewChat;