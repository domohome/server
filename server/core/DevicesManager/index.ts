import { Duplex } from 'stream';
import { Logger } from 'tslog';
import {AirtonDriver} from '../Drivers/AirtonDriver';

export namespace DevicesManager {
    const devices: Set<Duplex> = new Set<Duplex>();
    const log = new Logger();

    export function add( stream : Duplex) {
	log.info('adding device');
        devices.add(stream);
        stream.on('error', ()=> {
            log.warn(`error on stream ... closing`);
            devices.delete(stream);
            stream.end();
        });
        stream.on('finish', ()=> {
            log.warn(`stream closed`);
            devices.delete(stream);
            stream.end();
        });
      AirtonDriver.setOn24Hot();
    }

    export function broadcast(data: Buffer) {
        devices.forEach((device: Duplex) => {
            device.write(data);
        });
    }
}
