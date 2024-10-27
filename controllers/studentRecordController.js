import studentRecordModel from "../models/studentRecordModel.js";

export const studentRecord = async (req, res) => {
  try {
    const { userId, gpa, carryOverCourses, failedCourses } = req.body;

    const record = await studentRecordModel.findOneAndUpdate(
      { userId },
      { gpa, carryOverCourses, failedCourses },
      { new: true, upsert: true }
    );

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentRecord = async (req, res) => {
  try {
    const record = await studentRecordModel.findOne({
      userId: req.params.userId,
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdvices = async (req, res) => {
  try {
    const { userId, gpa, carryOverCourses, failedCourses } = req.body;

    const record = await studentRecordModel.findOneAndUpdate(
      { userId },
      { gpa, carryOverCourses, failedCourses },
      { new: true, upsert: true }
    );

    let advice = "";

    // Basic GPA-based advice
    if (gpa < 2.0) {
      advice +=
        "Your GPA is very low my dear, i am so sorry but you have to buckle up especially if you want to graduate with a higher CGPA. It is recommended to consult your academic advisor, pay attention to courses that have a higher credit unit, and Read harder ";
    } else if (gpa < 3.0) {
      advice +=
        "Your GPA is very acceptable but it could be greatly improved. i would advice you consider focusing on challenging courses. and if you want to improve your GPA please make sure courses with a higher credit unit are paid attention to. ";
    } else {
      advice += "Your GPA is very good. Keep up the good work! ";
    }

    // Carry-over courses advice
    if (carryOverCourses.length > 0) {
      advice += `You have ${failedCourses.length} carry-over course(s). Ensure to prioritize these courses to avoid further backlog. `;
    }

    // Failed courses advice based on the total failed units
    const totalFailedUnits = failedCourses.reduce(
      (total, course) => total + parseInt(course.units),
      0
    );
    if (totalFailedUnits > 0) {
      advice += `You have ${totalFailedUnits} failed units. Plan to retake these courses to meet graduation requirements. Consider allocating extra study time or seeking tutoring help.`;
    }

    res.json({ advice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
