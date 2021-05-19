const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.status(406).json({
        status: 'Error',
        message: err.message,
      });
      return next(err);
    });
  };
};

module.exports = catchAsync;
