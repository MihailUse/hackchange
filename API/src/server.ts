import cors from "cors";
import express from "express";
import morgan from "morgan";

import App from "./app";
import UserRouter from "./router/UserRouter";


const app = new App({
    port: Number(process.env.PORT) || 3040,

    middlewares: [
        express.json({
            limit: "100mb"
        }),
        express.urlencoded({ extended: false }),
        cors(),
        morgan('dev')
    ],

    routes: [
        new UserRouter(),
    ]
});

app.listen();
