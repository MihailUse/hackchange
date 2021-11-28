import { Server, Socket } from "socket.io";
import { Application } from 'express'
import http from "http";
import Message from "../database/models/Message";


const ROOMS: string[] = ["1", "2", "3", "4", "5"];

export default class ServerSocket {
    private httpServer: http.Server;
    private server: Server;
    private users: IUser[];

    constructor(app: Application) {
        this.httpServer = http.createServer(app);
        this.server = new Server<IClientToServerEvents, IServerToClientEvents, ISocketData>(this.httpServer);

        this.server.on("connection", (socket: Socket) => {
            socket.join(ROOMS);

            socket.on("identity", userId => {
                this.users.push({
                    userId: userId,
                    socketId: socket.id,
                });
            });

            socket.on("message", async (message: IMessage, user: IUser) => {

                // await Message.create({
                    
                // })

                socket.to(message.roomId).emit("message", message, user.userId)
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

    public listen(host: string, port: number) {
        this.httpServer.listen(port, () => {
            console.log(`Server running on http://${host}:${port}`);
        })
    }
}