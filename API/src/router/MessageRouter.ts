import { Request, Response } from "express";
import BaseRouter from "./BaseRouter";
import { HTTPStatus, validateJWT } from "../utils";
import { ApplicationError } from "./ApplicationError";
import Comment from "../database/models/Comment";


export default class MessageRouter extends BaseRouter {
    constructor(basePath: string) {
        super(basePath);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/getMessages", this.getMessages.bind(this), validateJWT);

        this.RegisterPostRoute("/create", this.create.bind(this), validateJWT);
        this.RegisterPostRoute("/edit", this.edit.bind(this), validateJWT);
        this.RegisterPostRoute("/delete", this.delete.bind(this), validateJWT);
    }

    private async getMessages(req: Request, res: Response): Promise<void> {
        const { publicationId }: {
            publicationId: number;
        } = req.body;

        if (!publicationId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "publicationId is required field");
        }

        const comments: Comment[] = await Comment.findAll({
            where: { publicationId: publicationId }
        });

        res.json({ comments });
    }

    private async create(req: Request, res: Response): Promise<void> {
        const { message, publicationId }: {
            message: string;
            publicationId: number;
        } = req.body;

        if (!message || !publicationId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "message and publicationId is required field");
        }

        const comment: Comment = await Comment.create({
            message: message,
            userId: req.body.token.user.id,
            publicationId: publicationId
        });

        res.json({ comment });
    }

    private async edit(req: Request, res: Response): Promise<void> {
        const { commentId, message }: {
            commentId: number;
            message: string;
        } = req.body;

        if (!commentId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "commentId is required field");
        }

        const comment: Comment = await Comment.findByPk(commentId);
        if (!commentId) {
            throw new ApplicationError(HTTPStatus.NOT_FOUND, "Comment not found");
        }

        await comment.update({
            message: message,
        });

        res.json({ comment });
    }

    private async delete(req: Request, res: Response): Promise<void> {
        const { commentId } = req.body;

        if (!commentId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "commentId is required field");
        }

        const comment: Comment = await Comment.findByPk(commentId);
        await comment.destroy();

        res.json({ message: "ok" });
    }
}
