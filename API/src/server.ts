import cors from "cors";
import express from "express";

import App from "./app";
import UserRouter from "./router/UserRouter";


const app = new App(Number(process.env.PORT) || 3040);

app.middlewares([
    express.json({
        limit: "100mb"
    }),
    express.urlencoded({ extended: false }),
    cors(),
]);

app.routes([
    new UserRouter("/user"),
]);

app.listen();
