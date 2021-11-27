import express, { Router } from "express";
import { Request, Response } from "express";
import { ApplicationError } from "./ApplicationError";
import { HTTPStatus } from "../utils";


export default abstract class BaseRouter {
    public router: Router = express.Router();
    public basePath: string = "/";

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    protected failable(func: (req: Request, res: Response) => Promise<any>) {
        return async function (req: Request, res: Response) {
            try {
                await func(req, res);
            } catch (err) {
                console.error("error", err);
                if (err instanceof ApplicationError) {
                    res.status(err.status).json({ message: err.message });
                } else {
                    res.status(HTTPStatus.INTERNAL).json({ message: err });
                }
            }
        };
    }

    protected RegisterGetRoute(path, handler) {
        this.router.get(path, this.failable(handler));
    }

    protected RegisterPostRoute(path, handler, middleware?) {
        if (middleware) {
            this.router.post(path, middleware, this.failable(handler));
            return;
        }
        this.router.post(path, this.failable(handler));
    }
}
