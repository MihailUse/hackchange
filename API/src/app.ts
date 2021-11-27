import express from "express";
import { Application } from "express";
import BaseRouter from "./router/BaseRouter";

export default class App {
    private app: Application;
    private host: string;
    private port: number;

    constructor(host: string, port: number) {
        this.app = express();
        this.host = host;
        this.port = port;
    }

    public middlewares(middlewares: any[]): void {
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
            console.log(`App listening on the http://${this.host}:${this.port}`);
        });
    }
}
