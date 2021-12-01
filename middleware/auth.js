var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'dbrest'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Connect');
});

exports.register = function(req,res){
    var post = {
        username : req.body.username,
        email : req.body.email,
        password : md5(req.body.password),
        role : req.body.role,
        tanggal_daftar : new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?"
    var table = ["user" , "email", post.email ];

    query = mysql.format(query,table); 

    conn.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ['user'];
                query = mysql.format(query,table);
                conn.query(query,post, function(error,rows){
                    if(error) throw error;
    
                    response.ok('Berhasil Mendaftar',res);
                })
            }else{
                response.ok('Email Sudah terdaftar',res)
            }
        }     
    }) 

}


exports.Login = function(req,res){
    var post = {
        password : req.body.password,
        email : req.body.email
    }

    var query = 'SELECT * FROM ?? WHERE ??=? AND ??=?'
    var table = ["user" ,"password" ,md5(post.password) ,"email",post.email];

    query = mysql.format(query,table)
    conn.query(query ,function(error,rows) {
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret,{
                    expiresIn : 2000
                });
                id_user = rows[0].id_user;

                var data = {
                    id_user : id_user,
                    token : token,
                    ip : ip.address()
                }
    
                var query = 'INSERT INTO ?? SET ?';
                var table = ['akses'];

                query = mysql.format(query,table);

                conn.query(query,data,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                         res.json({
                             success:true,
                             message:"Generate JSON Token ",
                             token:token,
                             User : data.id_user
                         });
                    }
                });
            }else{
                 res.json({'Error': true, "Message" :"Email atau Password Salah!"});
            }
        }
    })
}

exports.secret = function(req,res){
    response.ok('Halaman untuk Role 2',res)
}
