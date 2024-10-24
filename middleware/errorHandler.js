const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation failed';
    }
  
    if (err.name === 'UnauthorizedError') {
      statusCode = 401;
      message = 'Not authorized';
    }
  
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorHandler;
  