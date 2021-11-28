import { Request, Response } from "express";
import BaseRouter from "./BaseRouter";
import { HTTPStatus, Permission, validateJWT } from "../utils";
import { ApplicationError } from "./ApplicationError";
import Room from "../database/models/Room";
import RoomUser from "../database/models/RoomUser";
import Message from "../database/models/Message";


export default class RoomRouter extends BaseRouter {
    constructor(basePath: string) {
        super(basePath);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/create", this.create.bind(this), validateJWT);
        this.RegisterPostRoute("/getHistory", this.getHistory.bind(this), validateJWT);
        this.RegisterPostRoute("/getRooms", this.getRooms.bind(this), validateJWT);
    }

    private async create(req: Request, res: Response): Promise<void> {
        const { userId, name, description }: {
            userId: number;
            name: string;
            description?: string;
        } = req.body;

        if (!userId || !name) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "userId and name is required fields");
        }

        const room: Room = await Room.create({
            name: name,
            description: description,
        });

        await RoomUser.bulkCreate([
            {
                roomId: room.id,
                userId: req.body.token.user.id,
                permissionId: Permission.OWNER
            },
            {
                roomId: room.id,
                userId: userId,
                permissionId: Permission.MEMBER
            }
        ]);

        res.json({ room });
    }

    private async getHistory(req: Request, res: Response): Promise<void> {
        const { roomId }: { roomId: number } = req.body;

        if (!roomId) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "roomId is required field");
        }

        const room: Room = await Room.findOne({
            where: {
                id: roomId
            },
            include: [Message]
        });

        res.json({ room });
    }

    private async getRooms(req: Request, res: Response): Promise<void> {
        const rooms: Room[] = await Room.findAll({
            include: {
                model: RoomUser,
                where: {
                    userId: req.body.token.user.id,
                }
            }
        });

        res.json({ rooms });
    }
}
