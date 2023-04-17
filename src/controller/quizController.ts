import { NextFunction, Request, Response } from 'express';
import { IQuizCreatePayload } from '../types/quiz';
import { parsePhoneNumber } from '../utils/phone';
import Members from '../database/entity/members';
import Quiz from '../database/entity/quiz';
import PaymentLinkCheckouts from '../database/entity/payment.link.checkouts';
import { Providers } from '../database/entity/providers';

export default class QuizController {
    private static instance: QuizController;
    private constructor() {}

    public static getInstance(): QuizController {
        if (!QuizController.instance) {
            QuizController.instance = new QuizController();
        }
        return QuizController.instance;
    }

    public async Create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as IQuizCreatePayload;
        try {
            // check if member exists
            const userRepo = Members.getRepository();
            let member = await userRepo.findOne({
                where: {
                    email: body.email.trim().toLowerCase(),
                },
            });
            if (!member) {
                // create member
                member = new Members();
                member.name = body.name;
                member.email = body.email.trim().toLowerCase();
                member.phoneNumber = parsePhoneNumber(body.phoneNumber);
                await member.save();
            }

            // check if provider exist
            const providerRepo = Providers.getRepository();
            const provider = await providerRepo.findOne({
                where: {
                    practiceSlug: body.providerSlug.trim().toLowerCase(),
                },
            });
            if (!provider) {
                return res.status(400).json({
                    error: 'invalid provider slug, provider not found',
                });
            }

            // create quiz
            const quiz = new Quiz();
            quiz.completedAt = new Date();
            quiz.memberId = member.id;
            quiz.providerSlug = body.providerSlug;
            await quiz.save();

            res.status(201).json({
                ...quiz,
                member,
            });
        } catch (e) {
            next(e);
        }
    }

    public async Completed(req: Request, res: Response, next: NextFunction) {
        const quizId = req.params.id;
        try {
            const quizRepo = Quiz.getRepository();
            const quiz = await quizRepo.findOne({
                where: {
                    id: quizId,
                },
            });
            if (!quiz) {
                return res.status(404).json({
                    error: 'provided quiz not found',
                });
            }
            if (quiz.paymentLinkCheckoutId) {
                // this already has payment info
                const paymentRepo = PaymentLinkCheckouts.getRepository();
                const existingPaymentLinkCheckout = await paymentRepo.findOne({
                    where: {
                        id: quiz.paymentLinkCheckoutId,
                    },
                });
                return res.status(200).json({
                    ...quiz,
                    paymentLinkCheckoutId: existingPaymentLinkCheckout!.id,
                    paymentLink: existingPaymentLinkCheckout!.stripePaymentLink,
                    amount: existingPaymentLinkCheckout!.amount,
                });
            }
            // create payment link checkout
            const payment = new PaymentLinkCheckouts();
            payment.memberId = quiz.memberId;
            payment.stripePaymentLink = 'https://strip-payment-link-goes.here';
            payment.stripePaymentIntent = JSON.stringify({ type: 'stripe-payment-intent-object-goes-here' });
            payment.amount = 100 * 100; // $100, store in cents
            payment.tosAccepted = true;
            await payment.save();

            // update quiz
            quiz.paymentLinkCheckoutId = payment.id;
            await quiz.save();

            // response
            res.status(201).json({
                ...quiz,
                paymentLinkCheckoutId: payment.id,
                paymentLink: payment.stripePaymentLink,
                amount: payment.amount,
            });
        } catch (e) {
            next(e);
        }
    }
}
