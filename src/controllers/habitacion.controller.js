import Habitacion from "../models/habitacion";

export const createHabitacion = async (req, res) => {
  const { tipo_usuario, numero_habitacion, tipo, precio } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  const habitacion = await Habitacion.findOne({
    numero_habitacion: numero_habitacion,
  });

  if (habitacion)
    return res.status(400).json({ message: "La habitacion ya existe" });

  try {
    const newHabitacion = new Habitacion({
      disponibilidad: true,
      numero_habitacion,
      tipo,
      precio,
    });

    const habitacionSaved = await newHabitacion.save();

    res.status(201).json(habitacionSaved);
  } catch (error) {
    console.log(error);
  }
};

export const getHabitaciones = async (req, res) => {
  //Obtener un listado de las piezas disponible de acuerdo con su tipo
  const { tipo_usuario, tipo_pieza } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const habitaciones = await Habitacion.find({
      tipo: tipo_pieza,
      disponibilidad: true,
    });

    res.status(200).json(habitaciones);
  } catch (error) {
    console.log(error);
  }
};
