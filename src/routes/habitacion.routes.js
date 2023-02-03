import { Router } from "express";
const router = Router();

import * as habitacionCtrl from "../controllers/habitacion.controller";

router.post("/create", habitacionCtrl.createHabitacion);

router.get("/getHabitaciones", habitacionCtrl.getHabitaciones);

export default router;
