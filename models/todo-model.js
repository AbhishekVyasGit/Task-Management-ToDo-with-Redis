const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        task: {type: String, required: true},
        whenToComplete: {type: Date, required: true},
        isCompleted: {type: Boolean, required: false, default: false},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Todo = mongoose.model("todos", todoSchema);
module.exports = Todo;