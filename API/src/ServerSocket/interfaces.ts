// for socket.emit()
interface IServerToClientEvents {
    message: (message: IMessage, userId: number) => void;
}

// for socket.on()
interface IClientToServerEvents {
    identity: (userId: number, rooms: string[]) => void;
    message: (message: IMessage, user: IUser) => void;
    disconnect: () => void;
}

interface ISocketData {
    id: number;
    name: string;
}


interface IUser {
    userId: number;
    socketId: string;
}

interface IMessage {
    message: string
    roomUuid: string
}