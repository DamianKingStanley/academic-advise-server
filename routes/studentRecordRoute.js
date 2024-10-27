import express from "express";
import {
  studentRecord,
  getStudentRecord,
  getAdvices,
} from "../controllers/studentRecordController.js";

const router = express.Router();

router.post("/user/seek", studentRecord);
router.get("/user/record/:userId", getStudentRecord);
router.post("/generate-advice", getAdvices);

export default router;
