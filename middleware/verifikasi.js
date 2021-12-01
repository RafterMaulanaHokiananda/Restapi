const jwt = require('jsonwebtoken');
const config = require('../config/secret')

function Verifikasi(){

    return function(req,rest,next){
        var role = req.body.role;
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            jwt.verify(token, config.secret,function(err,decoded){
                if(err){
                    return rest.status(401).send({auth:false,message:'Token tidak terdaftar'})
                }else{
                    if(role == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false,message:'Gagal'})
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false,message:'Token tidak terdaftar'})
        }
    }
}


module.exports = Verifikasi;