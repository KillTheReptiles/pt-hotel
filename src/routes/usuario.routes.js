import { Router } from "express";
const router = Router();

import * as usuarioCtrl from "../controllers/usuario.controller";

router.post("/create", usuarioCtrl.createUsuario);

router.put("/change-descuento", usuarioCtrl.changeDescuento);

router.get("/get-descuento", usuarioCtrl.getDescuento);

export default router;
