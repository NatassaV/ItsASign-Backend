/* eslint-disable camelcase */
const express = require("express");

const coursesRouter = express.Router();
const {
  getCourses,
  getCourse_by_topic,
  getLessons_by_topic,
  getQuestion,
} = require("../controllers/lessons.controller");

coursesRouter.get("/", getCourses);
coursesRouter.route("/:course_topic").get(getCourse_by_topic);
coursesRouter.route("/:course_topic/:lesson_number").get(getLessons_by_topic);
coursesRouter.route("/:course_topic/:lesson_number/:index").get(getQuestion);

module.exports = coursesRouter;
