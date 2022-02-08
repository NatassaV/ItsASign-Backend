# ItsASign

An app to teach the user the basics of sign British language.
Play while you learn and enjoy hand-tracking features.
Follow quiz-style lessons.
Test yourself using the machine learning based hand-tracking mode that gives you feedback on your signing.

tech : MongoDB, Node, express, Mocha

Hosted on Heroku : https://its-a-sign-app.herokuapp.com/api/

REST API:

Get ('/', getUsers);

('/:username')
  .get(getUser)
  .patch(patchUserDetails)
  .delete(deleteUser);
  
('/:username/progress').get(getUserProgress);

Post ('/signup')

Post ('/sign_in');

Get ('/', getCourses);

('/:course_topic').get(getCourse_by_topic);

('/:course_topic/:lesson_number').get(getLessons_by_topic);

('/:course_topic/:lesson_number/:index/question').get(getQuestion);
  
('/:course_topic/:lesson_number/:index/answers').get(getAnswers);
