import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename =
  fileURLToPath(import.meta.url);


const __dirname =
  path.dirname(__filename);


const curriculumPath =
  path.join(
    __dirname,
    "../../data/curriculum.json"
  );


const curriculumData =
  JSON.parse(
    fs.readFileSync(
      curriculumPath,
      "utf-8"
    )
  );


// The actual curriculum topics
// are stored inside the "days" array.

const curriculumDays =
  curriculumData.days;


// Safety check

if (!Array.isArray(curriculumDays)) {

  throw new Error(
    "curriculum.json must contain a 'days' array."
  );

}


// =========================================
// GET COMPLETE CURRICULUM
// =========================================

export function getCurriculum() {

  return curriculumData;

}


// =========================================
// GET ONE CURRICULUM DAY
// =========================================

export function getDay(dayNumber) {

  return curriculumDays.find(
    day =>
      day.day === dayNumber
  );

}