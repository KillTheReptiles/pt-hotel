import { Router } from "express";
const router = Router();

import * as usuarioCtrl from "../controllers/usuario.controller";

router.post("/create", usuarioCtrl.createUsuario);

router.put("/changeDescuento", usuarioCtrl.changeDescuento);

export default router;
