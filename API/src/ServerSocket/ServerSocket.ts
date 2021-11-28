import { Server, Socket } from "socket.io";
import { Application } from 'express'
import http from "http";
import Message from "../database/models/Message";
import Room from "../database/models/Room";
import RoomUser from "../database/models/RoomUser";


export default class ServerSocket {
    private httpServer: http.Server;
    private server: Server;
    private users: IUser[];

    constructor(app: Application) {
        this.httpServer = http.createServer(app);
        this.server = new Server<IClientToServerEvents, IServerToClientEvents, ISocketData>(this.httpServer);

        this.server.on("connection", (socket: Socket) => {
            socket.on("identity", async (userId: number, rooms: string[]) => {
                this.users.push({
                    userId: userId,
                    socketId: socket.id,
                });

                socket.join(rooms);
            });

            socket.on("message", async (message: IMessage, userId: number) => {

                const room: Room = await Room.findOne({
                    where: { roomUuid: message.roomUuid }
                });

                console.log(message.message);

                await Message.create({
                    message: message.message,
                    roomId: room.id,
                    userId: (await this.getUserBySocket(socket)).userId
                });

                socket.broadcast.to(message.roomUuid).emit("message", message, userId);
            });

            this.server.on("disconnect", () => {
                this.users = this.users.filter((user) => user.socketId !== socket.id);
            });
        });

        this.server.use((socket, next) => {
            const token = socket.handshake.auth.token;
            console.log(token);

            if (token == 400) {
                socket.disconnect(true);
            }

            next();
            socket.on("disconnect", () => {
                console.log(`${socket.id} was disconnected`);
            });
        });
    }

    private async getUserBySocket(socket: Socket): Promise<IUser> {
        return this.users.filter((user) => user.socketId === socket.id)[0];
    }


    public listen(host: string, port: number): void {
        this.httpServer.listen(port, () => {
            console.log(`Server running on http://${host}:${port}`);
        })
    }
}