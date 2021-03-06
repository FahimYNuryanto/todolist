var express = require('express');
var app = express();

app.use(express.json())

var data = require('./storage')

app.post('/api/todos', function(req, res){
    const text = req.body.text
    if(text === ''){
        res.status(400).send("Error: Text is Empty")
        return
    }
    const id = Math.floor((Math.random() * 100) + 1)
    data[id] = {
        text: text,
        done: false
    }

    res.send("ToDo Added")
})

app.get('/api/todos', function(req, res){
    res.send(data)
})

app.delete('/api/todos/:id', function(req, res){
    const id = req.params.id
    if (id in data){
        delete data[id]
        res.send("Data has been deleted")
    }
    res.status(400).send("Error : ID not found")
})

app.put('/api/todos/:id', function(req, res){
    const id = req.params.id
    if (id in data){
        if  (req.body.text === "" && req.body.done=== ""){
            res.status(400).send('Error: text and done are empty')
        }
        else if (req.body.text == undefined && req.body.done == undefined){
            res.status(400).send("Cannot update data into undefined")
        }
        else if (req.body.text === ""){
            res.status(400).send('Error: text is empty')
        }
        else if (req.body.done === ""){
            res.status(400).send('Error: done is empty')
        }
        else if (req.body.text == undefined || req.body.text == ''){
            data[id].done = req.body.done
        }
        else if (req.body.done == undefined || req.body.done == ''){
            data[id].text = req.body.text
        }
        else {
            data[id].text = req.body.text
            data[id].done = req.body.done
        }
        res.send('data updated')
        return
    }
    res.status(400).send("Error : Cannot update ID")
})

module.exports= {app}