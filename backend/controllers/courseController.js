import Course from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, lessons } = req.body;

    if (!title || !lessons || lessons.length === 0) {
      return res.status(400).json({ message: "Title and at least one lesson are required." });
    }

    const newCourse = new Course({
      title,
      description,
      lessons,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully!", course: newCourse });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: err.message });
  }
};
