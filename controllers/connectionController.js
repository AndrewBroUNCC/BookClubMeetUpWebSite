const model = require('../models/connection');

exports.index = (req, res, next) => {
    //res.send('send all stories');
    //res.send(model.find());
    model.find()
    .then(connections=>res.render('./story/index',{connections}))
    .catch(err=>next(err));
};

exports.new = (req, res) => {
    res.render('./story/new');
 };

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
    //console.log(req.body);//shows what is sent
    let story = new model(req.body); //create a story object
    story.save()//insert the document to the database
    .then(story=>{
        //console.log(story);
        res.redirect('/stories');
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;

    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(story=>{
        if(story){
            res.render('./story/show', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));

    // let story = model.findById(id);
    // //res.send('send story with id ' + req.params.id);
    // //res.send(story);
    // if(story) {
    //     res.render('./story/show', {story});
    // } else {
    //     //res.status(404).send('Can not find story with id ' + id);
    //     let err = new Error('Cannot find a story with id ' + id);
    //     err.status = 404;
    //     next(err);
    // }
}; 

exports.edit = (req, res, next) => {
    //res.send('send the edit form');
    let id = req.params.id;

    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(story=>{
        if(story) {
            return res.render('./story/edit', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));

    // let story = model.findById(id);
    // if(story) {
    //     res.render('./story/edit', {story});
    // } else {
    // //res.status(404).send('Can not find story with id ' + id);
    // let err = new Error('Cannot find a story with id ' + id);
    // err.status = 404;
    // next(err);
    // }
};

exports.update = (req, res, next) => {
    //res.send('send story with id ' + req.params.id);
    let story = req.body;
    //console.log(story);
    let id = req.params.id;

    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, story, {useFindAndModify: false, runValidators: true})
    .then(story=>{
        if(story) {
            res.redirect('/stories/'+id);
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    });

    // if(model.updateById(id, story)){
    //     res.redirect('/stories/'+id)
    // } else {
    //     //res.status(404).send('Cannot find story with id ' + id);
    //     let err = new Error('Cannot find a story with id ' + id);
    //     err.status = 404;
    //     next(err);
    // }
 }; 

exports.delete = (req, res, next) => {
    //res.send('send story with id ' + req.params.id);
    //console.log(req.params.id);
    let id = req.params.id;

    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } 

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(story=>{
        if(story){
            res.redirect('/stories');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));

    // if(model.deleteById(id)){
    //     res.redirect('/stories');
    // }  else {
    //     //res.status(404).send('Cannot find story with id ' + id);
    //     let err = new Error('Cannot find a story with id ' + id);
    //     err.status = 404;
    //     next(err);
    // }
};