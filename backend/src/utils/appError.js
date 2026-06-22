const appError = (message, status) => {
  const error = new Error(message);

  error.status = status;
  error.isOperational = true;
  return error;
};

export default appError;