const {login, create} = require('../models/User')
const jwt = require('jsonwebtoken');
const {genSaltSync, hashSync} = require('bcrypt');

class AuthUserController{
    static login(req, res){
        const user = {
            user_name: req.body.user_name,
            password: req.body.password
        }
        
        login(user.user_name, user.password)
        .then(result =>{
            if(result.length) {
                const token = jwt.sign({id:result[0].id}, process.env.TOKEN_SECRET,{expiresIn: '1h'});
                return res.status(200).json({
                    result: {
                        success: true,
                        message: "logged succefully",
                        access_token: token
                    }
                })
            }
            return res.status(200).json({
                result:{
                    success: true,
                    message: "Email or UserName not found !!!"
                }
            })
        })
        .catch(errro=>{
            return res.status(500).json({
                error:{
                    success: false,
                    message: "database error",
                    error: errro
                }
            })
        })
    }
    static register(req, res){
        const sel= genSaltSync(10); 
        const user={
            name: req.body.name,
            user_name:  req.body.user_name,
            password: hashSync(req.body.password, sel)
        }
        create(user)
        .then(result=>{
            return res.status(401).json({
                result:{
                    success: true,
                    message: 'data created successfuly'
                }
            });
        })
        .catch(error=>{
            return res.status(500).json({
                error:{
                    success: false,
                    message: "Internal servral",
                    error: error
                }
            });
        });
    }
}
module.exports = AuthUserController;