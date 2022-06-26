const router = require('express').Router();
const Address = require('../models/address');

router.post('/save', (req, res) => {
    const address = new Address({
        name: req.body.name,
        amount: req.body.amount,
        address: req.body.address,
        product_id: req.body.product_id,
        date: Date.now().valueOf()
    })
    address.save()
           .then((results) => {
               res.json({success: true, message: "Address has been added"})
           }).catch((err) => {
               res.json({success: false, message:err})
           })
});
module.exports = router;