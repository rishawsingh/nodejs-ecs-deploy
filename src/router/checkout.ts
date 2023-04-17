import { Router } from 'express';
import CheckoutController from '../controller/checkoutController';
export const CheckoutRouter = Router();
const checkout = CheckoutController.getInstance();

CheckoutRouter.post('/:id/completed', checkout.Completed);
