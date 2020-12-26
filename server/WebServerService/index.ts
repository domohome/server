import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
import TYPES from '../core/types';
import { Application, Express, request, Request, response, Response, static as expressStatic } from 'express';
import helmet = require('helmet');
import bodyParser = require('body-parser');
import cors = require('cors');
import { InversifyExpressServer } from 'inversify-express-utils';

@injectable()
export class WebServer {

    constructor(
        @inject(TYPES.IoCcontainer) private iocContainer: Container,
        @inject(TYPES.Password) private password: string) {
    }


    public setConfiguration(app: Application) {
        app = <Express>app;
        app.use(helmet());
        app.use(cors());
        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(expressStatic('public'));
        app.use(bodyParser.json());


        /*app.use((req: Request, res: Response, next: Function) => {
                const body = req.body;
                if(body.password === this.password) {
                    return next();
                } else {
                    return res.status(401).send("Unauthorized");
                }
        });*/

        app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({
                status: 'alive',
                appName: 'domohome',
                version: require('../../package.json').version
            });
        });
    }


    public async importController() {
        await import('./Controllers/Home');
    }

    public run() {
        const server = new InversifyExpressServer(this.iocContainer);
        server.setConfig(this.setConfiguration);
        this.importController()
            .then(() => {
                let serverInstance = server.build();
                serverInstance.listen(3000, () => {
                    console.log('listening on port 3000');
                });
            });
    }
}
