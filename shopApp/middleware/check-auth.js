const JWT = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
   try {
    const token  = req.headers.authorization.split(" ")[1];
    const decode = JWT.verify(token, "aminKey");
    req.userData = decode
    next()
   }catch(error) {
       res.json({success: false, message: "Auth Failed"})
   }

}

module.exports =  checkAuth;