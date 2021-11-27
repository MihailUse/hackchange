import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DAL } from "../database/DAL";
import { User } from "../database/models/User";
import BaseRouter from "./BaseRouter";
import { validateJWT } from "../utils";


export default class UserRouter extends BaseRouter {
    constructor(basePath: string) {
        super(basePath);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/singUp", this.singUp.bind(this), validateJWT);
        this.RegisterPostRoute("/singIn", this.singIn.bind(this), validateJWT);

        this.RegisterPostRoute("/get", this.getUser.bind(this), validateJWT);
        this.RegisterPostRoute("/create", this.createUser.bind(this), validateJWT);
        this.RegisterPostRoute("/edit", this.editUser.bind(this), validateJWT);
        this.RegisterPostRoute("/delate", this.delateUser.bind(this), validateJWT);
    }

    private async singUp(req: Request, res: Response): Promise<void> {
        const { newUser } = req.body;

        const user: User = await User.create({ ...newUser });

        res.json({ user });
    }

    private async singIn(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        const user: User = await User.findByPk(userId);

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
                expiresIn: "24h",
            }
        );

        res.json({ user, token });
    }

    private async getUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        const user: User = await User.findByPk(userId);

        res.json({ user });
    }

    private async createUser(req: Request, res: Response): Promise<void> {
        const { newUser } = req.body;

        const user: User = await User.create({ ...newUser });

        res.json({ user });
    }

    private async editUser(req: Request, res: Response): Promise<void> {
        const { update } = req.body;

        const user: User = await DAL.tryGetUser(req.body.token.user.id);
        await user.update({ ...update });

        res.json({ user });
    }

    private async delateUser(req: Request, res: Response): Promise<void> {
        const user: User = await User.findByPk(req.body.token.user.id);
        user.destroy();

        res.json({ message: "ok" });
    }
}
