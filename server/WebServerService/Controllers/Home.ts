import { controller, httpGet, httpPost, interfaces } from 'inversify-express-utils';
import { Response, Request } from 'express';
import { AirtonDriver } from '../../core/Drivers/AirtonDriver';
import { SchedulerService } from '../../core/SchedulerService';
import { Logger } from "tslog";

interface jobsOrder {
    enable: boolean;
    hours: number;
}


@controller('/home')
export class RootController implements interfaces.Controller {
    private log = new Logger();

    @httpGet('/job')
    public async get(req: Request, res: Response) {
      res.status(200).json(SchedulerService.getJob());
    }

    @httpPost('/heat')
    public async enableHeat(req: Request, res: Response) {
        const enable = <boolean>req.body.enable;
        if (enable) {
            AirtonDriver.setOn24Hot();
            res.status(200).send("sended hot command");
        } else {
            AirtonDriver.setOff();
            res.status(200).send("sended off command");
        }
    }

    @httpPost('/job')
    public async setHeatJob(req: Request, res: Response) {
          const order = <jobsOrder> req.body;
          console.log(order);
          if(order.enable) {
              
              SchedulerService.addHeatJob(order.hours);
          } else {
              SchedulerService.deleteHeatJob();
          }
    }

}
