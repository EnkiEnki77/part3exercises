const handleErrors = (err, req, res) => {
  console.error(err.message)
  if(err.name == 'ValidationError'){
    res.status(400).send({ err: err.message })
  }
}

function unknownEndpoint(req, res){
  res.status(404).json({
    error: 'Unknown endpoint'
  })
}

module.exports = { handleErrors, unknownEndpoint }