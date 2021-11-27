import express from "express";
import { Application } from "express";
import BaseRouter from "./router/BaseRouter";

export default class App {
    private app: Application;
    private port: number;

    constructor(port: number) {
        this.app = express();
    }

    public middlewares(middlewares: {
        forEach: (arg: (middleware: any) => void) => void;
    }): void {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    public routes(routes: BaseRouter[]): void {
        routes.forEach((controller) => {
            this.app.use(controller.basePath, controller.router);
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(
                `App listening on the http://localhost:${this.port}`
            );
        });
    }
}
