import { Schema, model } from "mongoose";

const reservaSchema = new Schema(
  {
    id_cliente: String,
    id_habitacion: String,
    fecha_entrada: Date,
    numero_dias: Number,
    //hay que mirar lo del descuento y el precio total
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Reserva", reservaSchema);
