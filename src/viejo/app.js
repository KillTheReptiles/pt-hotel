import express from "express";
import morgan from "morgan";

import pkg from "../package.json";

import usuarioRoutes from "./routes/usuario.routes";
import habitacionRoutes from "./routes/habitacion.routes";
import reservaRoutes from "./routes/reserva.routes";

const app = express();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Prueba Técnica - Hotel API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/usuario", usuarioRoutes);
app.use("/habitacion", habitacionRoutes);
app.use("/reserva", reservaRoutes);

export default app;
