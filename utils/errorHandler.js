const errorHandler = (err, req, res, next) => {
    // Set default status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // Set status code
    res.status(statusCode);
  
    // Send a structured JSON response
    res.json({
      message: err.message,
      // Stack trace is helpful during development, but you may want to hide it in production
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorHandler;