import { Logger } from "tslog";
import { createServer, Socket } from 'net';
import { DevicesManager } from "../core/DevicesManager";
const PORT = 10240

export namespace TcpServerService {
    const log = new Logger();

    export function init() {
        createServer((socket: Socket) => {
            DevicesManager.add(socket);
        })
            .listen(PORT, () => {
                log.info(`TCP server service listenning on port ${PORT}`);
            });


    }
}