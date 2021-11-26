import { Router, Request, Response } from "express";
import BaseRouter from "./BaseRouter";
import { User } from "./database/models/User";


export const apiRouter: Router = Router();


export default class ApiRouter extends BaseRouter  {
    constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/user", this.getUser.bind(this));
        this.RegisterPostRoute("/create", this.createUser.bind(this));
        this.RegisterPostRoute("/delate", this.delateUser.bind(this));
    }

    private async getUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        const user: User = await User.findByPk(userId);

        res.json({ user });
    }

    private async createUser(req: Request, res: Response): Promise<void>  {
        const { login, password } = req.body;

        const user: User = await User.create({
            login: login,
            password: password
        });

        res.json({ user });
    }

    private async delateUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        const user: User = await User.findByPk(userId);
        user.destroy();

        res.json({ message: "ok" });
    }
}
