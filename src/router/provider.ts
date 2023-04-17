import { Router } from 'express';
import ProviderController from '../controller/providerController';
import { ProviderCreateValidator } from '../types/provider';
import { validate } from 'express-validation';

export const ProviderRouter = Router();
const provider = ProviderController.getInstance();

ProviderRouter.post('/', validate(ProviderCreateValidator), provider.Create);
