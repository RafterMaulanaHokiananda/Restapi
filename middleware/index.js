const express = require('express');
const auth = require('./auth');
const Verifikasi = require('./verifikasi');
var router = express.Router();

router.post('/register',auth.register);
router.post('/login',auth.Login);
router.get('/secret', Verifikasi(), auth.secret)


module.exports = router;