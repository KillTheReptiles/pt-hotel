export const sendError = async (errorType, res) => {
  let code = 0,
    message = "";
  switch (errorType) {
    case ErrorType.ERROR_USER_EXIST:
      code = 400;
      message = "The user already exists.";
      break;
    case ErrorType.ERROR_EMAIL_EXIST:
      code = 400;
      message = "This email is already registered.";
      break;
    case ErrorType.ERROR_NUMBER_EXIST:
      code = 400;
      message = "This phone number is already registered.";
      break;
    case ErrorType.ERROR_404_NOT_FOUND:
      code = 404;
      message = "Object not found.";
      break;
    case ErrorType.ERROR_DELETE_SUCESFULLY:
      code = 202;
      message = "Deleted successfully.";
      break;
    case ErrorType.ERROR_400_BAD_REQUEST:
      code = 400;
      message = "Bad request.";
      break;
    case ErrorType.ERROR_401_NOT_PERMISSION:
      code = 401;
      message = "You don't have permission to do this.";
      break;
  }

  return res.status(code).json(message);
};

export let ErrorType = {
  ERROR_USER_EXIST: 1,
  ERROR_EMAIL_EXIST: 2,
  ERROR_NUMBER_EXIST: 3,
  ERROR_404_NOT_FOUND: 4,
  ERROR_DELETE_SUCESFULLY: 5,
  ERROR_400_BAD_REQUEST: 6,
  ERROR_401_NOT_PERMISSION: 7,
};
