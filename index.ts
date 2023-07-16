import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

const serverInstance: any = Server.instance;

serverInstance.app.use(bodyParser.urlencoded({ extended: true }));
serverInstance.app.use(bodyParser.json());

//cors
// serverInstance.app.use( cors({
//     origin: '*',
//     credentials: true
// }));

// serverInstance.app.use((req: any, res: any, next: any) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
//   });

//rutas de servicios
serverInstance.app.use('/', router);

serverInstance.start(() => {
    console.log(`Server start on port ${serverInstance.port}`);
}); 