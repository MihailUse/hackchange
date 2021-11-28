import { Request, Response } from "express";
import BaseRouter from "./BaseRouter";
import { HTTPStatus, validateJWT } from "../utils";
import { ApplicationError } from "./ApplicationError";
import Tool from "../database/models/Tool";


export default class ToolRouter extends BaseRouter {
    constructor(basePath: string) {
        super(basePath);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/create", this.create.bind(this), validateJWT);
    }

    private async create(req: Request, res: Response): Promise<void> {
        const { image, name, description }: {
            image?: string;
            name: string;
            description: string;
        } = req.body;

        if (!name || !description) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "name and description is required fields");
        }

        const tool: Tool = await Tool.create({
            image: image,
            name: name,
            description: description
        });

        res.json({ tool });
    }
}
