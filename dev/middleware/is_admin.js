const mustBeAdmin = (req, res, next) => {

  if(!req?.user || res.user?.role === 'student'){
    return res.status(403).json({
      success: true,
      message: "Permission Required",
    });
  }

  next()
}

module.exports = mustBeAdmin