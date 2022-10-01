const express = require('express');
const controller = require('../controllers/mainController.js');

const router = express.Router();

//send req to controller to send to home page
router.get('/', controller.index);

//send req to controller to send to about page
router.get('/about', controller.about);

//send req to controller to send to contact page
router.get('/contact', controller.contact);

module.exports = router;