const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const port = 8080;
const taskRoute =  require('./routes/task-routes');

// create application/json parser
const jsonParser = bodyParser.json()


mongoose.connect("mongodb+srv://root:root@aarzoocluster.6pwhj.mongodb.net/todo",
    (err) => {
        if(err) {
            console.log("Db not connecting ...");
        }else{
            console.log("Db connected")
        }
    });
app.use(jsonParser);
app.use('/task', taskRoute);

app.listen(port, () => {
    console.log("server is connected :", port);
});

//task1 : (tittle  : "Office Work")
        //(description: "Working on weather applicaton")
        //(date: 166687888 : )

