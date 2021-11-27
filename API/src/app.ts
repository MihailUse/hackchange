import express from "express";
import { Application } from "express";
import BaseRouter from "./router/BaseRouter";
import ServerSocket from "./ServerSocket/ServerSocket";

export default class App {
    private app: Application;
    private serverSocket: ServerSocket;
    private host: string;
    private port: number;

    constructor(host: string, port: string | number) {
        this.app = express();
        this.serverSocket = new ServerSocket(this.app);
        this.host = host;
        this.port = Number(port);
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
        this.serverSocket.listen(this.host, this.port);
    }
}
