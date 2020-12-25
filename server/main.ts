import {Container} from 'inversify';
import TYPES from './core/types';
import { TcpServerService } from './TcpServerService';
import {WebServer} from './WebServerService';

const password = process.env.PASSWORD;

export const IocContainer = new Container();
IocContainer.bind(TYPES.Password).toConstantValue(password);
IocContainer.bind(TYPES.IoCcontainer).toConstantValue(IocContainer);
IocContainer.bind<WebServer>(TYPES.WebServer).to(WebServer);

TcpServerService.init();

const webServer = IocContainer.get<WebServer>(TYPES.WebServer);
webServer.run();
