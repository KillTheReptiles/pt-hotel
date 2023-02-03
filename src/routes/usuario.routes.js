import { Router } from "express";
const router = Router();

import * as usuarioCtrl from "../controllers/usuario.controller";

router.get("/users-list");

export default router;
