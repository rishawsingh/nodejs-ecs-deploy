import { NextFunction, Request, Response } from 'express';
import { IProviderCreatePayload } from '../types/provider';
import { Providers } from '../database/entity/providers';

export default class ProviderController {
    private static instance: ProviderController;
    private constructor() {}

    public static getInstance(): ProviderController {
        if (!ProviderController.instance) {
            ProviderController.instance = new ProviderController();
        }
        return ProviderController.instance;
    }

    public async Create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as IProviderCreatePayload;
        try {
            const providerRepo = Providers.getRepository();
            const existingProvider = await providerRepo.findOne({
                where: [
                    { email: body.email.trim().toLowerCase() },
                    { practiceSlug: body.practiceSlug.trim().toLowerCase() },
                ],
            });
            if (existingProvider) {
                return res.status(200).json({
                    ...existingProvider,
                });
            }
            // create new provider
            const provider = new Providers();
            provider.email = body.email.trim().toLowerCase();
            provider.practiceName = body.practiceName;
            provider.practiceSlug = body.practiceSlug.trim().toLowerCase();
            provider.name = body.name;
            await provider.save();
            res.status(201).json({
                ...provider,
            });
        } catch (e) {
            next(e);
        }
    }
}
