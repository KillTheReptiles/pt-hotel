import Reserva from "../models/reserva";
import Habitacion from "../models/habitacion";

export const createReserva = async (req, res) => {
  const { fecha_entrada, numero_dias, idf_cliente, numero_habitacion, nombre } =
    req.body;
  try {
    const habitacion = await Habitacion.findOne({
      numero_habitacion: numero_habitacion,
    });

    if (habitacion.disponibilidad == false)
      return res
        .status(400)
        .json({ message: "La habitacion no esta disponible" }); // si la habitacion no esta disponible, no se crea la reserva

    const newReserva = new Reserva({
      fecha_entrada,
      numero_dias,
      idf_cliente,
      numero_habitacion,
      nombre,
    });

    const reservaSaved = await newReserva.save();

    const actualizarHabitacion = await Habitacion.findOneAndUpdate(
      { numero_habitacion: numero_habitacion },
      { disponibilidad: false },
      {
        new: true,
      }
    );

    res.status(201).json(reservaSaved);
  } catch (error) {
    console.log(error);
  }
};
