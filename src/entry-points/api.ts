import express from 'express';
import { appealUseCases } from '../domain/appeal-use-cases';
import { AppealDTO } from '../common/dto';
import { validationMiddleware } from '../middlewares/validate-middleware';

export class AppealController {
  public path = '/appeal';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllAppeals);
    this.router.get(`${this.path}/:id`, this.getAppealById);
    this.router.post(this.path, validationMiddleware(AppealDTO), this.createAppeal);
    this.router.patch(`${this.path}/takeAppealToWork/:id`, this.takeAppealToWork);
    this.router.patch(`${this.path}/finishAppealById/:id`, this.finishAppealById);
    this.router.patch(`${this.path}/denyAppealById/:id`, this.denyAppealById);
    this.router.patch(`${this.path}/denyAllAppeals`, this.denyAllAppeals);
  }

  private getAllAppeals = async (request, response, next) => {
    try {
      const { date, from, to } = request.query;
      const result = await appealUseCases.getAllAppeals(date, from, to);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

  private getAppealById = async (request, response, next) => {
    try {
      const { id } = request.params;
      const result = await appealUseCases.getAppealById(id);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

  private createAppeal = async (request, response, next) => {
    try {
      const data = request.body;
      const result = await appealUseCases.createAppeal(data);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

  private takeAppealToWork = async (request, response, next) => {
    const { id } = request.params;
    try {
      const result = await appealUseCases.takeAppealToWork(id);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

  private finishAppealById = async (request, response, next) => {
    try {
      const { id } = request.params;
      const result = await appealUseCases.finishAppealById(id);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

  private denyAppealById = async (request, response, next) => {
    try {
      const { id } = request.params;
      const { other } = request.body;
      const result = await appealUseCases.denyAppealById(id, other);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

  private denyAllAppeals = async (request, response, next) => {
    try {
      const result = await appealUseCases.denyAllAppeals();
      response.send(result);
    } catch (error) {
      next(error);
    }
  };
}
