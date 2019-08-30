import {controller, httpGet, interfaces} from 'inversify-express-utils';
import {Response, Request} from 'express';

@controller('/')
export class RootController  implements interfaces.Controller{

    @httpGet('/')
    public async get(req: Request, res: Response) {
        res.status(200).send("Hello World");
    }

}
