import { NextFunction, Response, Request } from "express";

// Create an error-handling middleware
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({error : { message: 'Internal Server Error' }});
}