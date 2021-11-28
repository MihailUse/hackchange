import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DAL } from "../database/DAL";
import BaseRouter from "./BaseRouter";
import User from "../database/models/User";
import { HTTPStatus, validateJWT } from "../utils";
import { ApplicationError } from "./ApplicationError";


export default class UserRouter extends BaseRouter {
    constructor(basePath: string) {
        super(basePath);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/singIn", this.singIn.bind(this));
        this.RegisterPostRoute("/singUp", this.singUp.bind(this));

        this.RegisterPostRoute("/get", this.getUser.bind(this), validateJWT);
        this.RegisterPostRoute("/edit", this.editUser.bind(this), validateJWT);
        this.RegisterPostRoute("/delete", this.deleteUser.bind(this), validateJWT);
    }

    private async singUp(req: Request, res: Response): Promise<void> {
        const { avatar, name, email, password, shortLink }: {
            avatar?: string,
            name: string,
            email: string,
            password: string,
            shortLink?: string
        } = req.body;

        if (!name || !email || !password) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "name, email and password is required fields");
        }

        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS) || 10
        );

        const user: User = await User.create({
            avatar: avatar,
            name: name,
            password: passwordHash,
            email: email,
            shortLink: shortLink
        });

        const token = jwt.sign(
            {
                data: {
                    id: user.id,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: Number.parseInt(process.env.TOKEN_EXPIRES) // 30 days
            }
        );

        res.json({ user, token });
    }

    private async singIn(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user: User = await DAL.getUserByEmail(email);

        if (!user) {
            throw new ApplicationError(HTTPStatus.NOT_FOUND, "Ivalid email");
        }

        const hashCompare = await bcrypt.compare(password, user.password);
        if (!hashCompare) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Invalid password.");
        }

        const token = jwt.sign(
            {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: Number.parseInt(process.env.TOKEN_EXPIRES) // 30 days
            }
        );

        res.json({ user, token });
    }

    private async getUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        const user: User = await User.findByPk(userId);

        res.json({ user });
    }

    private async editUser(req: Request, res: Response): Promise<void> {
        const { avatar, name, email, password, shortLink }: {
                avatar?: string, 
                name?: string,
                email?: string,
                password?: string,
                shortLink?: string
            } = req.body;
        
        if (password) {
            var passwordHash = await bcrypt.hash(
                password,
                Number(process.env.SALT_ROUNDS) || 10
            );
        }
        
        const user: User = await User.findByPk(req.body.token.user.id);
        await user.update({
            avatar: avatar,
            name: name,
            password: passwordHash,
            email: email,
            shortLink: shortLink
        });

        res.json({ user });
    }

    private async deleteUser(req: Request, res: Response): Promise<void> {
        const user: User = await User.findByPk(req.body.token.user.id);
        await user.destroy();

        res.json({ message: "ok" });
    }
}
