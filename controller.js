'use strict'

var response = require('./res')
var connection = require('./db')

exports.index = function(req,res){
    response.ok('Success')
}