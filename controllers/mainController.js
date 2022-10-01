const model = require('../models/connection');

exports.index = (req, res) => {
    //res.send('send all stories');
    //res.send(model.find());
    res.render('index');
};

exports.about = (req, res) => {
    res.render('./story/about');
};

exports.contact = (req, res) => {
    res.render('./story/contact');
};