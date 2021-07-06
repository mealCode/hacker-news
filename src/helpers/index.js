
module.exports = {
  successResponse: (req, res, data = {}, code = 200) => {
    return res.status(code).json({
      ...data,
    });
  },

  errorResponse: (
    req,
    res,
    message = "An error occurred",
    code = 500,
    error = {}
  ) => {
    return res.status(500).json({
      code,
      message,
      error,
    });
  },
};