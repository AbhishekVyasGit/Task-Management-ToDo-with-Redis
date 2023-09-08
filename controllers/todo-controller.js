const express = require("express");
const router = express.Router();
const Todo = require("../models/todo-model");
const client = require("../configs/redis");



router.post("", async (req, res) => {

    try {

        const createTodo = await Todo.create(req.body);

        const todoS = await Todo.find();

        client.set("todoKey", JSON.stringify(todoS));

        console.log("redis create");

        return res.status(201).send(createTodo);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});



router.get("", async (req, res) => {

    try {
        // if we have todo key , so we can get the todo for it        
        client.get("todoKey", async (err, fetchedTodoS) => {
            if (fetchedTodoS) {
                const todoS = JSON.parse(fetchedTodoS);
                console.log("redis get");

                return res.status(200).send({ todoS, redis: true })
            }
            else {
                try {

                    const getTodo = await Todo.find();
                    //if we have'nt the key, so set the key for it.
                    client.set("todoKey", JSON.stringify(getTodo));

                    console.log("mongo get");


                    return res.status(200).send({ getTodo, redis: false });

                } catch (error) {
                    return res.status(500).send({ message: error.message });
                }
            }
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

});



router.get("/:id", async (req, res) => {

    try {
        // if we have todo key , so we can get the todo for it        
        client.get(`todoKey.${req.params.id}`, async (err, fetchedTodo) => {
            if (fetchedTodo) {
                const todo = JSON.parse(fetchedTodo);
                console.log("redis getById");

                return res.status(200).send({ todo, redis: true })
            }
            else {
                try {

                    const todo = await Todo.findById(req.params.id);
                    //if we have'nt the key, so set the key for it.
                    client.set(`todoKey.${req.params.id}`, JSON.stringify(todo));

                    console.log("mongo getById");


                    return res.status(200).send({ todo, redis: false });

                } catch (error) {
                    return res.status(500).send({ message: error.message });
                }
            }
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

});


router.patch("/:id", async (req, res) => {

    try {

        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        const todoS = await Todo.find();

        client.set(`todoKey.${req.params.id}`, JSON.stringify(todo));

        client.set(`todoKey`, JSON.stringify(todoS));

        return res.status(200).send(todo);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});



router.delete("/:id", async (req, res) => {

    try {

        const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

        const todoS = await Todo.find();

        client.del(`todoKey.${req.params.id}`);
        client.set(`todoKey`, JSON.stringify(todoS));

        return res.status(200).send(deleteTodo);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});






module.exports = router;
