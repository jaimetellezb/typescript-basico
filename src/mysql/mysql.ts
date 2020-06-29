import mysql = require("mysql");
import e = require("express");

export default class MySQL {
  // instancia de tipo MySQL (class)
  private static _instance: MySQL;

  // propiedades y métodos de la conexión
  cnn: mysql.Connection;
  connected: boolean = false;

  constructor() {
    // este console.log solo debería mostrarse una vez
    // si utilizamos el patrón Singleton
    console.log("Clase inicializada");

    //establecemos la conexión
    this.cnn = mysql.createConnection({
      host: "localhost",
      user: "node_user",
      password: "Node1234#",
      database: "node_db",
    });

    // conectamos a la BD
    this.connectDB();
  }

  /**
   * función que implementa el patrón Singleton de la clase MySQL
   * para mantener una única instancia
   */
  public static get instance() {
    // this._instance - si existe una instancia devuelve la misma
    // o sino existe una instancia
    // this._instance = new this() - crea una nueva
    // cuando se llama el método this() ejecuta de nuevo el constructor()
    return this._instance || (this._instance = new this());
  }

  static executeQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log("Error en query");
        console.log(err);
        return callback(err);
      }

      if (results.length === 0) {
        callback("el registro solicitado no existe");
      }

      callback(null, results);
    });
  }

  private connectDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }

      this.connected = true;
      console.log("Base de datos online");
    });
  }
}
