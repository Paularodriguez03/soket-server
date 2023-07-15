import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

const serverInstance: any = new Server();

serverInstance.app.use(bodyParser.urlencoded({ extended: true }));
serverInstance.app.use(bodyParser.json());

//cors
serverInstance.app.use( cors({
    origin: true,
    credentials: true
}))

//rutas de servicios
serverInstance.app.use('/', router);

serverInstance.start(() => {
    console.log(`Server start on port ${serverInstance.port}`);
}); 