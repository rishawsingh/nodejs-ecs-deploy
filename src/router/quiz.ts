import { Router } from 'express';
import QuizController from '../controller/quizController';
import { validate } from 'express-validation';
import { QuizCreateValidator } from '../types/quiz';
export const QuizRouter: Router = Router();
const quiz = QuizController.getInstance();

QuizRouter.post('/', validate(QuizCreateValidator), quiz.Create);
QuizRouter.patch('/:id/completed', quiz.Completed);
