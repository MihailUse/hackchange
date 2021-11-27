import { Request, Response } from "express";
import BaseRouter from "./BaseRouter";
import { HTTPStatus, validateJWT } from "../utils";
import { ApplicationError } from "./ApplicationError";
import { Publication } from "../database/models/Publication";


export default class PublicationRouter extends BaseRouter {
    constructor(basePath: string) {
        super(basePath);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/create", this.create.bind(this), validateJWT);
        this.RegisterPostRoute("/edit", this.edit.bind(this), validateJWT);
        this.RegisterPostRoute("/delete", this.delete.bind(this), validateJWT);
    }

    private async create(req: Request, res: Response): Promise<void> {
        const { image, title, message, onlineLink, toolId }: {
            image?: object;
            title: string;
            message: string;
            onlineLink?: string;
            toolId: number;
        } = req.body;

        const publication: Publication = await Publication.create({
            image: image,
            title: title,
            message: message,
            onlineLink: onlineLink,
            authorId: req.body.token.user.id,
            toolId: toolId
        });

        res.json({ publication });
    }

    private async edit(req: Request, res: Response): Promise<void> {
        const { publicationId, image, title, message, onlineLink, toolId }: {
            publicationId: number;
            image?: object;
            title?: string;
            message?: string;
            onlineLink?: string;
            toolId?: number;
        } = req.body;

        if (!publicationId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "publicationId is required field");
        }

        const publication: Publication = await Publication.findByPk(publicationId);
        if (!publicationId) {
            throw new ApplicationError(HTTPStatus.NOT_FOUND, "Publication not found");
        }
        
        await publication.update({
            image: image,
            title: title,
            message: message,
            onlineLink: onlineLink,
            toolId: toolId
        });

        res.json({ publication });
    }

    private async delete(req: Request, res: Response): Promise<void> {
        const { publicationId } = req.body;

        if (!publicationId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "publicationId is required field");
        }

        const publication: Publication = await Publication.findByPk(publicationId);
        await publication.destroy();

        res.json({ message: "ok" });
    }
}
