const handleErrors = (err, req, res, next) => {
    console.error(err)
    next(err)
}

function unknownEndpoint(req, res){
    res.status(404).json({
      error: 'Unknown endpoint'
    })
  }

module.exports = {handleErrors, unknownEndpoint}