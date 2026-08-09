import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { handleInterview } from "./controllers/interviewController.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 5000;


// =========================================
// MIDDLEWARE
// =========================================

app.use(cors());

app.use(express.json());


// =========================================
// HEALTH CHECK
// =========================================

app.get("/", (req, res) => {

  res.json({
    message:
      "AI Interview Agent backend is running!"
  });

});


// =========================================
// INTERVIEW API
// =========================================

app.post(
  "/api/interview",
  handleInterview
);


// =========================================
// START SERVER
// =========================================

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  }
);