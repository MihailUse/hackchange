import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import dotenv from "dotenv";

import User from "./models/User";
import Tool from "./models/Tool";
import Like from "./models/Like";
import Room from "./models/Room";
import Follow from "./models/Follow";
import Comment from "./models/Comment";
import Massage from "./models/Massage";
import RoomUser from "./models/RoomUser";
import Permission from "./models/Permission";
import Publication from "./models/Publication";
import ReplyComment from "./models/ReplyComment";

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
        Follow,
        RoomUser,
        Room,
        Permission,
        Massage
    ],
});

export default sequelizeDB;