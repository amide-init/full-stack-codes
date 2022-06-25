const router = require('express').Router();
const Product = require('../models/product');

//save data
router.post('/', (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail:req.body.thumbnail,
        date: Date.now().valueOf()
    });
    product.save()
        .then((results) => {
            res.json({ success: true, message: "Product has been created" });
        })
        .catch((err) => {
            res.json({ success: false, message: "Product is not creating" })
        });
})

//fetch all the Product
router.get('/', (req, res) => {
    Product.find({})
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
    Product.findOne({ _id: id })
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
    Product.updateOne({ _id: id }, { $set: req.body})
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
    Product.deleteOne({ _id: id })
        .exec()
        .then((results) => {
            res.json({ success: true, message: "Product has been removed" })
        })
        .catch((err) => {
            res.json({ success: false, message: "something went wrong" })
        })
})

module.exports = router;