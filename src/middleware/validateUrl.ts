import { NextFunction, Request, Response } from "express";

export function isValidUrl(req: Request, res: Response, next: NextFunction): void {
    const { url } = req.body
    if (!url) {
        res.status(400).json({error: {message:`URL cannot be empty`}})
    }
    // Regular expression for URL validation
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    urlRegex.test(url) ? next() : res.status(400).json({error: {message:`Invalid URL: ${url}`}})
}