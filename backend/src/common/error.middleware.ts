/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  public async use(req: Request, res: Response, next: NextFunction) {
    try {
      await next();
    } catch (err) {
      console.error('An error occurred:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
