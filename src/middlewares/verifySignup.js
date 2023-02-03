import User from "../models/User";
import { ROLES } from "../models/Role";
import { ErrorType, sendError } from "../Validation/Verification";
//VERIFY WITH ENUM ErrorType

const checkDuplicatedFields = async (req, res, next) => {
  // these fields must be validated for duplicates because they are unique in database
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return sendError(ErrorType.ERROR_USER_EXIST, res);
    const email = await User.findOne({ email: req.body.email.toLowerCase() });
    if (email) return sendError(ErrorType.ERROR_EMAIL_EXIST, res);
    const phone = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (phone) return sendError(ErrorType.ERROR_NUMBER_EXIST, res);

    next();
  } catch (error) {
    console.log(error);
    // status 500 doesn't give a response
    return res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

export { checkDuplicatedFields, checkRolesExisted };
