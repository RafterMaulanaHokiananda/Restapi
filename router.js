'use strict'

module.exports = function(app){
    var controller = require('./controller')
    app.route('/')
    .get(controller.index);

    app.route('/mahasiswa')
    .get(controller.getSiswa);

    app.route('/mahasiswa/:id')
    .get(controller.getSiswabyid);

    app.route('/mahasiswa')
    .post(controller.postSiswa);

    app.route('/matakuliah')
    .get(controller.getMatakuliah);

    app.route('/mahasiswa/:id')
    .put(controller.putSiswa);

    app.route('/mahasiswa/:id')
    .delete(controller.deleteSiswabyid);
}