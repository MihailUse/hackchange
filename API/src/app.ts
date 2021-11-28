import express from "express";
import { Application } from "express";
import { Sequelize } from "sequelize-typescript";
import sequelizeDB from "./database/sequelize";
import BaseRouter from "./router/BaseRouter";
import ServerSocket from "./ServerSocket/ServerSocket";


export default class App {
    private app: Application;
    private serverSocket: ServerSocket;
    private sequelize: Sequelize;
    private host: string;
    private port: number;

    constructor(host: string, port: string | number) {
        this.app = express();
        this.serverSocket = new ServerSocket(this.app);
        this.host = host;
        this.port = Number(port);
        this.sequelize = sequelizeDB;
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

    public async listen() {
        this.serverSocket.listen(this.host, this.port);
    }
}
