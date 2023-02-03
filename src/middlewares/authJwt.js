import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

var userObject;
export const verifyTokenAndUserStatus = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);

    if (!decoded) return res.status(401).json({ message: "Unauthorized!" });
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    if (user.status == "inactive")
      return res.status(401).json({ message: "You are banned!" });

    userObject = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

export const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const adminRole = await Role.findOne({ name: "admin" });
    const moderatorRole = await Role.findOne({ name: "moderator" });
    const user = await User.findById(req.userId);
    if (
      user.roles.includes(adminRole._id) ||
      user.roles.includes(moderatorRole._id)
    ) {
      next();
      return;
    }
    return res
      .status(403)
      .json({ message: "Require Admin or Moderator Role!" });
  } catch (error) {
    console.log(error);
    // status 500 doesn't give a response
    return res.status(500).send({ message: error });
  }
};

export const isAdminOnly = async (req, res, next) => {
  try {
    const adminRole = await Role.findOne({ name: "admin" });
    const user = await User.findById(req.userId);
    if (user.roles.includes(adminRole._id)) {
      next();
      return;
    }
    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    // status 500 doesn't give a response
    return res.status(500).send({ message: error });
  }
};

export function getUserLogged() {
  return userObject;
}
