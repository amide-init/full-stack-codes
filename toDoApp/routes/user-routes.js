const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("user get route")
})
router.post('/', (req, res) => {
    res.send("user post route")
})
router.get('/:id', (req, res) => {
    ///
})
router.patch('/:id', (req, res) => {
    ///
})
router.delete('/:id', (req, res) => {
    ///
})

module.exports = router;