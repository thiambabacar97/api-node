const jwt = require('jsonwebtoken');
exports.loggedIn = function(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(token===undefined || token===null){
        return res.status(401).json({
            message: "token not provid"
        });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, result)=>{
        if(error){
            return res.status(500).json({
                message: "token Invalid"
            }); 
        }
        next();
    });
}
