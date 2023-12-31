import express from "express";
import { SERVER_PORT } from "../global/environtment";
import socketIO from "socket.io";
import http from "http";
import * as socket from '../sockets/socket';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;

  httpServer = require("http").createServer();
  io = require("socket.io")(this.httpServer, {
    cors: {
      origin: "*",
    },
  });

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log("escuchando conexiones");

    this.io.on("connection", (cliente: any) => {
      console.log("Cliente conectado");

      // Conectar cliente
      socket.conectarCliente(cliente, this.io);

      // Configurar usuario
      socket.configurarUsuario(cliente, this.io);

      //getMensaje
      socket.getMensaje(cliente, this.io);
      // Mensajes
      socket.mensaje(cliente, this.io);

      // Desconectar
      socket.desconectar(cliente);
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
