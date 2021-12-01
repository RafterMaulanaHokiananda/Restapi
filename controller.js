'use strict'


var mysql = require('mysql')

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

var response = require('./res');
//  

exports.index = function(req,res){
    response.ok('Success' ,res)
};


//index
exports.getSiswa = function(req,res){
    conn.query('SELECT * FROM mahasiswa' , function (error, rows,fields){
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};

//Menampilkan Data

exports.getSiswabyid = function(req,res){
    let id = req.params.id;
    conn.query('SELECT * FROM mahasiswa where id_mahasiswa = ?',[id],function (error,rows,fields){
        if(error) throw error;
        
        response.ok(rows,res);
    }) ;
};

//Menambah Data

exports.postSiswa = function(req,res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    conn.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim,nama,jurusan],
        function(error,rows,fields){
            if(error) throw error;

            response.ok('Berhasil Insert Data',res)
        });
};

//Mengubah Data

exports.putSiswa = function(req,res){
    var id = req.params.id;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    
    conn.query('UPDATE mahasiswa SET nim = ?,nama = ?,jurusan = ? where id_mahasiswa = ?',
        [nim,nama,jurusan,id],
        function(error,rows,fields){
            if(error) throw error;

            response.ok('Berhasil Update Data' ,res)
        });
};;

//Menghapus Data

exports.deleteSiswabyid = function(req,res){
    let id = req.params.id;
    conn.query('DELETE FROM mahasiswa where id_mahasiswa = ?',[id],
    function (error,rows,fields){
        if(error) throw error;
        
        response.ok('Berhasil Menghapus Data',res);
    }) ;
};


//Melihat Matakuliah

exports.getMatakuliah = function(req,res){
    conn.query('SELECT mahasiswa.id_mahasiswa , mahasiswa.nim , mahasiswa.nama , mahasiswa.jurusan , matakuliah.matakuliah , matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa where krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function (error,rows,fields){
            if(error) throw error;

            response.matakuliah(rows,res);

        }
    )
}
