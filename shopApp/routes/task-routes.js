const router = require('express').Router();
const Task = require('../models/task');

//save data
router.post('/', (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        date: Date.now().valueOf()
    });
    task.save()
        .then((results) => {
            res.json({ success: true, message: "Task has been created" });
        })
        .catch((err) => {
            res.json({ success: false, message: "Task is not creating" })
        });
})

//fetch all the task
router.get('/', (req, res) => {
    Task.find({})
        .exec()
        .then((results) => {
            if (results.length < 1) {
                return res.send({ success: false, message: "NO data avilable" })
            }
            res.json({ success: true, data: results })
        })
        .catch((err) => {
            res.json({ success: false, message: "Data is not fetching" })
        })
})

//fetch only one doc with id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Task.findOne({ _id: id })
        .exec()
        .then((results) => {
            if (!results) {
                return res.send({ success: false, message: "NO data avilable" })
            }
            res.json({ success: true, data: results })
        })
        .catch((err) => {
            res.json({ success: false, message: "Data is not fetching" })
        })
})
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Task.updateOne({ _id: id }, { $set: req.body})
        .then((result) => {
            res.json({ success: true, message: "Data has been updated" })
        })
        .catch((err) => {
            res.json({ success: false, message: "something went wrong" })
        })
});
//delete data route
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Task.deleteOne({ _id: id })
        .exec()
        .then((results) => {
            res.json({ success: true, message: "Task has been removed" })
        })
        .catch((err) => {
            res.json({ success: false, message: "something went wrong" })
        })
})

module.exports = router;