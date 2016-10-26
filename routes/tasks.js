var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');

var db = mongojs('mongodb://a:a@ds031607.mlab.com:31607/mytasklist_brad' , ['tasks']);

router.get('/tasks', function(req , res , next){
        db.tasks.find(function(err , tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    })
});

//Get single task
router.get('/task/:id' , function(req , res , next){    
        db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)} , function(err , task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
});


//save tasks
router.post('/task', function(req, res , next){
    var task = req.body; // to get from the form 
    if(task.title || task.isDone +''){
        res.status(400);
        res.json({
            "error" : "bad data"
        })
    }else{
        db.tasks.save(task , function(err , task){
            if(err){
            res.send(err);
        }
        res.json(task);
        })
    }
});

//delete a task
router.delete('/task/:id' , function(req , res , next){    
        db.tasks.remove({_id: mongojs.ObjectId(req.params.id)} , function(err , task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
});

//update task
router.put('/task/:id' , function(req , res , next){   

    var task = req.body;
    var upTask = {};
    if(task.isDone){
        upTask.isDone = task.isDone;
    }
    if(task.isDone){
        upTask.title = task.title;
    }
    if(!upTask){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        })
    }else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)} ,upTask , {}, function(err , task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
    }

        
});



module.exports = router;