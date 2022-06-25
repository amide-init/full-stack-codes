const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 8080;
const taskRoutes =  require('./routes/task-routes');
const userRoutes =  require('./routes/user-routes');

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
app.use(cors());
app.use(jsonParser);
app.use('/task', taskRoutes);
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log("server is connected :", port);
});


