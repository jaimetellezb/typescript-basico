// importar el archivo server.ts
import Server from "./server/server";
import router from "./router/router";
import MySQL from "./mysql/mysql";

// inicializar el servidor express y enviamos puerto 3000
const server = Server.init(3000);
// usar las rutas en express
server.app.use(router);

MySQL.instance;

// iniciar servidor
server.start(() => {
  console.log("Servidor corriendo en el puerto 3000");
});

// =======================================================
// ejecutar el comando tsc para compilar todo el código de typescript y
//convertirlo a javascript en la carpeta dist/
// =======================================================
// en el archivo package.json, se creó los siguientes scripts
// =======================================================
// Para copiar los archivos html a la carpeta dist ya que el comando tsc solo compila
// los archivos de typescript
// se instaló el paquete copyfiles de node (npm i copyfiles --save-dev)
//"html": "copyfiles -u 1 src/public/*.html dist",
// ========================================================
// se creó otro script para ejecutar ambos comandos en uno solo que sería:
// npm run build
//"build": "tsc && npm run html"
