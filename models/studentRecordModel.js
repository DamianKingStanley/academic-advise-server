import mongoose from "mongoose";
const studentRecordSchema = new mongoose.Schema({
  userId: {
    type: String, // Assuming you are using user IDs as strings
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
  carryOverCourses: [
    {
      courseCode: {
        type: String,
        required: true,
      },
      creditUnits: {
        type: Number,
        required: true,
      },
    },
  ],
  failedCourses: [
    {
      courseCode: {
        type: String,
        required: true,
      },
      creditUnits: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Student", studentRecordSchema);
