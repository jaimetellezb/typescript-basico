import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";

// crear nueva instancia de Router
const router = Router();

// configuración de las rutas de express
router.get("/heroes", (req: Request, res: Response) => {
  const query = `
    SELECT * 
    FROM heroes`;

  MySQL.executeQuery(query, (err: any, heroes: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        heroes,
      });
    }
  });
});

router.get("/heroes/:id", (req: Request, res: Response) => {
  // id recibido por url
  const id = req.params.id;

  const escapedId = MySQL.instance.cnn.escape(id);

  const query = `
    SELECT * 
    FROM heroes WHERE id = ${escapedId}`;

  MySQL.executeQuery(query, (err: any, heroes: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        heroe: heroes[0],
      });
    }
  });
});

export default router;
