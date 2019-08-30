import {Container} from 'inversify';
import TYPES from './core/types';
import {WebServer} from './WebServerService';

export const IocContainer = new Container();
IocContainer.bind(TYPES.IoCcontainer).toConstantValue(IocContainer);
IocContainer.bind<WebServer>(TYPES.WebServer).to(WebServer);


const webServer = IocContainer.get<WebServer>(TYPES.WebServer);
webServer.run();
