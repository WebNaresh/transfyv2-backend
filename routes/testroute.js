const express = require('express');
const { test, } = require('../controller/testController');
const router = express.Router();
router.route('/test').get(test);


module.exports = router;