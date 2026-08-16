# AI Technical Interview Agent

An AI-powered technical interview agent that analyzes a candidate's learning journey and conducts a personalized, adaptive technical interview based on the curriculum topics they completed.

The system uses candidate performance data, curriculum information, and Gemini-powered agents to generate technical questions, evaluate answers, ask follow-up questions, and provide detailed feedback at the end of the interview.

---

## 🚀 Features

### Candidate Analysis
- Loads candidate learning journey and mission completion data.
- Identifies:
  - Strong areas
  - Uncertain areas
  - Weak areas
  - Completed curriculum topics
  - Skipped topics
- Uses attempts and completion status to determine candidate proficiency.

### Curriculum-Based Interview Planning
- Builds an interview plan from the candidate's completed curriculum.
- Prioritizes areas based on candidate performance.
- Avoids generating questions from topics the candidate has not completed.
- Covers multiple curriculum days during the interview.

### AI-Powered Interviewer
- Generates technical interview questions using Google Gemini.
- Questions are based on:
  - Curriculum topic
  - Learning objectives
  - Candidate role
  - Candidate experience
  - Previous conversation
- Focuses on practical engineering scenarios, implementation, architecture, debugging, and trade-offs.

### Adaptive Follow-Up Questions
- Evaluates each candidate response.
- Determines whether additional clarification is required.
- Can ask a follow-up question while staying on the same curriculum topic.
- Moves to a new curriculum topic when appropriate.

### Answer Evaluation
- Evaluates candidate answers using an AI evaluator agent.
- Considers the current question and curriculum topic.
- Stores evaluations throughout the interview.

### Automated Feedback
At the end of the interview, the system generates:

- Overall summary
- Strengths
- Areas to improve
- Recommended next steps

### Professional Interview UI
- Candidate selection interface
- Interview progress tracking
- AI interviewer chat
- Answer input interface
- Curriculum progress
- Interview completion screen
- Detailed technical feedback

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │   Candidate Data    │
                    │  candidate.json     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Candidate Analyzer  │
                    │                     │
                    │ Strong Areas        │
                    │ Uncertain Areas     │
                    │ Weak Areas          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Interview Planner   │
                    │                     │
                    │ Candidate Data +    │
                    │ Curriculum          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Interviewer Agent   │
                    │                     │
                    │ Google Gemini       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Technical Question  │
                    └──────────┬──────────┘
                               │
                         Candidate Answer
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Evaluator Agent    │
                    │                     │
                    │ Answer Evaluation   │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
              Follow-up              Next Topic
                    │                     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Feedback Agent    │
                    │                     │
                    │ Summary             │
                    │ Strengths           │
                    │ Gaps                │
                    │ Next Steps          │
                    └─────────────────────┘





🧠 How It Works

1. Candidate Selection
The interviewer starts with a candidate from the provided candidate dataset.
Example:
{
  "member": {
    "id": "CAND-001",
    "name": "Sarah Johnson",
    "jobRole": "Senior Data Engineer",
    "yearsExperience": 9
  }
}

2. Candidate Analysis
The candidate analyzer processes completed missions.
Missions are categorized into:
Completed
    │
    ├── Strong Areas
    │      └── Passed on first attempt
    │
    └── Uncertain Areas
           └── Passed after multiple attempts
Failed
    │
    └── Weak Areas

Skipped
    │
    └── Excluded from completed curriculum

3. Interview Planning
The interview planner selects curriculum days based on the candidate's performance.
Priority:

Weak Areas
     ↓
Uncertain Areas
     ↓
Strong Areas
     ↓
Additional Completed Areas
The selected days are then mapped to the corresponding curriculum objects.

4. Question Generation
The interviewer agent receives:
Candidate Role
Candidate Experience
Curriculum Day
Curriculum Topic
Topic Type
Tools
Learning Objectives
Previous Conversation
Question Number
Gemini then generates a single technical interview question based on that information.
The system instructs the interviewer to avoid asking about topics outside the candidate's completed curriculum.

5. Answer Evaluation
After the candidate submits an answer, the evaluator agent analyzes:
Current Question
+
Candidate Answer
+
Current Curriculum Topic
The evaluation determines whether the candidate needs a follow-up question.

6. Adaptive Interview Flow
If a follow-up is required:
Same Curriculum Topic
        ↓
Follow-up Question
Otherwise:
Current Topic
     ↓
Next Uncovered Curriculum Topic
     ↓
New Technical Question
This allows the interview to adapt based on the candidate's responses.

7. Final Feedback
Once the interview is completed, the feedback agent analyzes the accumulated evaluations and generates:
Overall Summary
Strengths
Areas to Improve
Recommended Next Steps

🛠️ Tech Stack
Frontend
React
Vite
JavaScript
CSS
Backend
Node.js
Express.js
JavaScript
REST API
AI
Google Gemini
@google/genai
Data
JSON-based candidate data
JSON-based curriculum data
In-memory interview session state


📁 Project Structure
AI-Interview-Agent/
│
├── backend/
│   ├── data/
│   │   ├── candidate.json
│   │   └── curriculum.json
│   │
│   ├── src/
│   │   ├── agents/
│   │   │   ├── evaluatorAgent.js
│   │   │   ├── feedbackAgent.js
│   │   │   └── interviewerAgent.js
│   │   │
│   │   ├── controllers/
│   │   │   └── interviewController.js
│   │   │
│   │   ├── services/
│   │   │   ├── candidateAnalyzer.js
│   │   │   ├── curriculumService.js
│   │   │   ├── interviewPlanner.js
│   │   │   └── llmService.js
│   │   │
│   │   ├── state/
│   │   │   └── interviewStore.js
│   │   │
│   │   ├── routes/
│   │   │   └── interview.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnswerInput.jsx
│   │   │   ├── CandidateSelector.jsx
│   │   │   ├── FeedbackPanel.jsx
│   │   │   ├── InterviewChat.jsx
│   │   │   ├── InterviewHeader.jsx
│   │   │   └── MessageBubble.jsx
│   │   │
│   │   ├── data/
│   │   │   ├── candidate.json
│   │   │   └── demoCandidates.js
│   │   │
│   │   ├── pages/
│   │   │   └── Interview.jsx
│   │   │
│   │   ├── services/
│   │   │   └── interviewApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore

⚙️ Getting Started
Prerequisites
Make sure you have:
Node.js
npm
Google Gemini API key

1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/AI-Interview-Agent.git
cd AI-Interview-Agent

2. Install Backend Dependencies
cd backend
npm install

3. Configure Environment Variables
Create:
backend/.env
Add:
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
Never commit the .env file to GitHub.

4. Start the Backend
From the backend directory:
npm run dev
The backend runs on:
http://localhost:5000

5. Install Frontend Dependencies
Open another terminal:
cd frontend
npm install

6. Start the Frontend
npm run dev
Vite will provide the local development URL, typically:
http://localhost:5173

🔄 Interview Flow
Select Candidate
       ↓
Analyze Candidate Journey
       ↓
Identify Strong / Uncertain / Weak Areas
       ↓
Build Curriculum-Based Interview Plan
       ↓
Generate Technical Question
       ↓
Candidate Answers
       ↓
Evaluate Answer
       ↓
Follow-up OR Move to Next Curriculum Topic
       ↓
Repeat
       ↓
Generate Final Feedback

🔐 Environment Variables
The application requires:
Variable	Description
GEMINI_API_KEY	Google Gemini API key
PORT	Backend server port

🎯 Hackathon Focus
The core idea is to move away from generic interview questions.
Instead of:
Candidate → Generic Question Bank → Interview
the system uses:

Candidate Learning Journey
          ↓
Completed Curriculum
          ↓
Performance Analysis
          ↓
Personalized Interview Plan
          ↓
Adaptive AI Interview
          ↓
Candidate-Specific Feedback

This allows the interviewer to test what the candidate actually learned during their curriculum journey.

🔮 Future Improvements

Potential extensions include:
Persistent interview sessions
Database-backed candidate and interview data
Interview analytics dashboard
More sophisticated answer scoring
Interview difficulty adaptation
Voice-based interviews
Resume-aware questioning
Interview history and comparison
Recruiter dashboard
Production deployment
