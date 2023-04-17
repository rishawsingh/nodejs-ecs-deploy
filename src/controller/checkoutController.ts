import { NextFunction, Request, Response } from 'express';
import PaymentLinkCheckouts from '../database/entity/payment.link.checkouts';
import Quiz from '../database/entity/quiz';
import { Providers } from '../database/entity/providers';
import { IsNull, Not } from 'typeorm';
import moment from 'moment';
import { sendEmail } from '../utils/sendgrid';

export default class CheckoutController {
    private static instance: CheckoutController;
    private constructor() {}

    public static getInstance(): CheckoutController {
        if (!CheckoutController.instance) {
            CheckoutController.instance = new CheckoutController();
        }
        return CheckoutController.instance;
    }

    public async Completed(req: Request, res: Response, next: NextFunction) {
        const paymentLinkCheckoutId = req.params.id;
        try {
            // find payment link checkout
            const paymentLinkRepo = PaymentLinkCheckouts.getRepository();
            const paymentLink = await paymentLinkRepo.findOne({
                where: {
                    id: paymentLinkCheckoutId,
                },
            });
            if (!paymentLink) {
                return res.status(400).json({
                    error: 'invalid payment link checkout id, not found',
                });
            }

            const moneyEarnedFromSale = paymentLink.amount;
            // find quiz with this payment
            const quizRepo = Quiz.getRepository();
            const quiz = await quizRepo.findOne({
                where: {
                    paymentLinkCheckoutId,
                },
            });
            if (!quiz) {
                return res.status(500).json({
                    error: 'quiz not found against payment',
                });
            }
            // find provider details
            const providerRepo = Providers.getRepository();
            const provider = await providerRepo.findOne({
                where: {
                    practiceSlug: quiz.providerSlug,
                },
            });
            if (!provider) {
                return res.status(500).json({
                    error: 'provider not found against quiz',
                });
            }
            // now find all quiz for this provider
            const allQuiz = await quizRepo.find({
                where: {
                    providerSlug: quiz.providerSlug,
                    paymentLinkCheckoutId: Not(IsNull()),
                },
            });
            // for all quiz for this month and sum the sale
            const thisMonthSale = allQuiz
                .filter((q) => {
                    return moment(q.createdAt).isSame(new Date(), 'month');
                })
                .reduce((acc, curr) => {
                    return acc + 100;
                }, 0);

            // send email
            await sendEmail(provider.email, `$${thisMonthSale}`, `$${moneyEarnedFromSale}`);
            res.status(200).json({
                thisMonthSale,
                moneyEarnedFromSale,
            });
        } catch (e) {
            next(e);
        }
    }
}
