import { Joi } from 'express-validation';

export interface IProviderCreatePayload {
    name: string;
    practiceName: string;
    email: string;
    practiceSlug: string;
}

export const ProviderCreateValidator = {
    body: Joi.object({
        name: Joi.string().required(),
        practiceName: Joi.string().required(),
        email: Joi.string().email().required(),
        practiceSlug: Joi.string().required(),
    }),
};
