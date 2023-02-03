import { Router } from "express";
const router = Router();

import * as reservaCtrl from "../controllers/reserva.controller";

router.post("/create", reservaCtrl.createReserva);

router.delete("/delete/:numero_habitacion", reservaCtrl.deleteReserva);
export default router;
