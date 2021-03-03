const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        
        required: false,
    },
});

const TodoModel = mongoose.model('todolist', TodoSchema)

module.exports = TodoModel;