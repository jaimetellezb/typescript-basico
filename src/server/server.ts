/**
 * para usar express con typeScript
 * debemos tener instalado typeScript (sudo npm i -g typescript)
 * también npm install @types/express --save-dev (express para typescript en desarrollo)
 */
import express = require("express");
// también se puede
//import express from "express";
import path = require("path");

// export para que la clase se pueda usar en otros archivos
// default la clase Server es la que se va importar por defecto
export default class Server {
  // es se puede reducir
  //   public app: express.Application;
  //   public port: number;

  //   constructor(port: number) {
  //     this.port = port;
  //     this.app = express();
  //   }

  // esto es igual a lo que hay en las líneas comentadas
  // este puede ir en el constructor pero por el momento no lo necesitamos
  public app: express.Application;

  constructor(public port: number) {
    // iniciar la apliación
    this.app = express();
  }

  // este es el método que se va llamar para disparar el constructor e inicializar todo
  // para solo tener una sola instancia de express
  static init(port: number) {
    return new Server(port);
  }

  /**
   * función que se encarga de
   */
  private publicFolder() {
    // definir el path de la carpeta "public"
    // donde estará el frontend para este ejercicio
    const publicPath = path.resolve(__dirname, "../public");
    this.app.use(express.static(publicPath));
  }

  // iniciar el express con el puerto que se desea
  start(callback: Function) {
    this.app.listen(this.port, callback());
    this.publicFolder();
  }
}

// VERSION JS

// const express = require('express');

// const path = require('path');

// const app = express();

// const publicPath = path.resolve(__dirname, '../public');
// const port = process.env.PORT || 3000;

// app.use(express.static(publicPath));

// app.listen(port, (err) => {

//     if (err) throw new Error(err);

//     console.log(`Servidor corriendo en puerto ${ port }`);

// });
