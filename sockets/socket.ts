import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);

};

export const desconectar = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");

    usuariosConectados.borrarUsuario(cliente.id);
  });
};

export const getMensaje = (cliente: Socket, io: socketIO.Server) => {
    consumeService(
        "https://clientescebarfcprod-dot-backend-cebar.uc.r.appspot.com/api/crudprueba/"
      ).then((data) => {
        console.log("mensajes", data);
        io.emit("mensajes", data);
      });
}
// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("Mensaje recibido", payload);

    postData(
      "https://clientescebarfcprod-dot-backend-cebar.uc.r.appspot.com/api/crudprueba/",
      {
        observaciones: payload.cuerpo,
      }
    ).then((data) => {
      console.log(data);

      // consumir el servicio
      consumeService(
        "https://clientescebarfcprod-dot-backend-cebar.uc.r.appspot.com/api/crudprueba/"
      ).then((data) => {
        console.log("mensaje nuevo", data);
        io.emit("mensaje-nuevo", data);
        io.emit("estadistia", data.length);
      });

      //2da servicio

    });

    // io.emit('mensaje-nuevo', payload );
  });
};

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: string }, callback: Function) => {
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`,
      });
    }
  );
};

async function postData(url: string, data: any): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de configurar el tipo de contenido adecuado
      },
      body: JSON.stringify(data), // Convierte los datos a formato JSON antes de enviarlos
    });

    if (!response.ok) {
      throw new Error(
        "Error en la solicitud. Código de estado: " + response.status
      );
    }

    // El método "json()" convierte la respuesta JSON en un objeto de JavaScript
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

async function consumeService(url: string): Promise<any> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Error en la solicitud. Código de estado: " + response.status
      );
    }

    // El método "json()" convierte la respuesta JSON en un objeto de JavaScript
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
