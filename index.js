var express = require('express');
var app = express();

app.use(express.json())

var data = {}

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
        const text = req.body.text
        const done = req.body.done
        if (text === undefined || text === ''){
            data[id].done = req.body.done
        }
        if (done === undefined || done === ''){
            data[id].text = req.body.text
        }
        else {
            data[id] = {
                text: text,
                data: done
            }
        }
        res.send('data updated')
        return
    }
    res.status(400).send("Error : Cannot update ID")
})


app.listen(3500, () => {
    console.log("Running a server....");
})