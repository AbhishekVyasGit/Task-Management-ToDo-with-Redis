const express = require("express");
const app = express();
const connect = require("./configs/db");
const todoController = require("./controllers/todo-controller");
const cors = require("cors");
app.use(cors("*"));
app.use(express.json());


app.use("/todos",todoController);




app.listen(5000, async () => {
    try {
        console.log("hello ji ,listening to port 5000 , please waiting for connection... ");
    } catch (err) {
        console.log("connection failed", err);
    }
});