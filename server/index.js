const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const TodoModel = require('./models/Todo')

app.use(express.json());
app.use(cors());

///DATABASE CONNECTION
mongoose.connect(
    "mongodb://localhost:27017/todo?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    { useNewUrlParser: true,
        useUnifiedTopology: true
     }
);

app.post('/insert', async (req, res) => {
    const title = req.body.title;
    const todo = new TodoModel({ title: title});
    await todo.save()
    res.send("Success");
});

app.get('/read', async (req, res) => {
    TodoModel.find({}, (err, result) => {
        if (err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', async(req, res) => {
    const newTitle = req.body.newTitle;
    const id = req.body.id;
    try{
        await TodoModel.findById(id, (error, titleToUpdate) => {
            titleToUpdate.title = Number(newTitle);
            titleToUpdate.save();
        });
    } catch (err){
        console.log(err);
    }
    res.send("updated");
});

// app.delete('/delete/:id', async (req, res) => {
//     const id = req.param.id
//     await TodoModel.findByIdAndRemove(id).exec()
//     res.send("item Deleted");
// });

app.listen(3001, () => {
    console.log ("You are now connected to the server!");
});