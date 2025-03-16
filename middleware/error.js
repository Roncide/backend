exports.handleError = async (err, req, res, next) => {
    console.error(err);//logging the error to the console
    res.status(500).json({ message: 'Internal Server Error' });//sending a generic error response
  };
  
