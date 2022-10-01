const model = require('../models/connection');

exports.index = (req, res) => {
    //res.send('send all stories');
    //res.send(model.find());
    let connections = model.find();
    res.render('./story/index',{connections});
};

exports.new = (req, res) => {
    res.render('./story/new');
 };

exports.create = (req, res)=>{
    //res.send('Created a new story');
    //console.log(req.body);//shows what is sent
    let story = req.body; //create a story object
    model.save(story);
    res.redirect('/stories');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let story = model.findById(id);
    //res.send('send story with id ' + req.params.id);
    //res.send(story);
    if(story) {
        res.render('./story/show', {story});
    } else {
        //res.status(404).send('Can not find story with id ' + id);
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
}; 

exports.edit = (req, res, next) => {
    //res.send('send the edit form');
    let id = req.params.id;
    let story = model.findById(id);
    if(story) {
        res.render('./story/edit', {story});
    } else {
    //res.status(404).send('Can not find story with id ' + id);
    let err = new Error('Cannot find a story with id ' + id);
    err.status = 404;
    next(err);
    }
};

exports.update = (req, res, next) => {
    //res.send('send story with id ' + req.params.id);
    let story = req.body;
    //console.log(story);
    let id = req.params.id;

    if(model.updateById(id, story)){
        res.redirect('/stories/'+id)
    } else {
        //res.status(404).send('Cannot find story with id ' + id);
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
 }; 

exports.delete = (req, res, next) => {
    //res.send('send story with id ' + req.params.id);
    console.log(req.params.id);
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/stories');
    }  else {
        //res.status(404).send('Cannot find story with id ' + id);
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};