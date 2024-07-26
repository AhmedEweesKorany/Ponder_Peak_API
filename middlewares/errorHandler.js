const errResponserHandler = (err,req,res,next) => { // when i write 4 params like this express  will understand that is for error handling

    const statusCode = err.statusCode || 400 
    res.status(statusCode).json({
        message: err.message,
        ahmed:"Soo",
        stack: process.env.NODE_ENV === 'development' ? err.stack : 'API is unavailable'  // Only in development environment show stack trace
    })
}


    
const invalidRoute = (req, res, next) => {
    const error = new Error('Invalid route');
    error.statusCode = 404;
    next(error);
}

module.exports = {errResponserHandler,invalidRoute};