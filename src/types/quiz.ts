import { Joi } from 'express-validation';
import JoiPhoneValidator from 'joi-phone-number';
const phoneValidator = Joi.extend(JoiPhoneValidator);

export interface IQuizCreatePayload {
    name: string;
    email: string;
    phoneNumber: string;
    providerSlug: string;
}

export const QuizCreateValidator = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: phoneValidator
            .string()
            .phoneNumber({
                defaultCountry: 'US',
                format: 'e164',
            })
            .required(),
        providerSlug: Joi.string().required(),
    }),
};
