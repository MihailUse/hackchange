import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import dotenv from "dotenv";

import User from "./models/User";
import Publication from "./models/Publication";
import Tool from "./models/Tool";
import ReplyComment from "./models/ReplyComment";
import Comment from "./models/Comment";
import Like from "./models/Like";
import Follow from "./models/Follow";

dotenv.config();

const sequelizeDB = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: <Dialect>process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [
        User,
        Publication,
        Tool,
        Comment,
        ReplyComment,
        Like,
        Follow
    ],
});

export default sequelizeDB;