import cors from "cors";
import express from "express";

import App from "./app";
import MessageRouter from "./router/MessageRouter";
import PublicationRouter from "./router/PublicationRouter";
import ToolRouter from "./router/ToolRouter";
import UserRouter from "./router/UserRouter";


const app = new App(process.env.NODE_HOST, process.env.NODE_PORT || 3040);

app.middlewares([
    express.json({
        limit: "100mb"
    }),
    express.urlencoded({ extended: false }),
    cors(),
]);

app.routes([
    new UserRouter("/user"),
    new ToolRouter("/tool"),
    new MessageRouter("/message"),
    new PublicationRouter("/publication")
]);

app.listen();
