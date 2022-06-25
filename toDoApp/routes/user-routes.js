const router = require('express').Router();
const User = require('../models/user');
const bcrpyt = require('bcrypt');
const JWT  = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

//save data
router.post('/signup', (req, res) => {
    bcrpyt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "hashing not working" })
        } else {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                date: Date.now().valueOf()
            })

            user.save()
                .then((result) => {
                    res.json({ success: true, message: "Account has been created" })
                })
                .catch((err) => {
                    res.json({ success: false, message: "server error", error: err })
                })
        }
    })
})

router.post('/login', (req, res) => {
     User.findOne({email: req.body.email})
        .exec()
        .then((result) => {
            if(result) {
                bcrpyt.compare(req.body.password, result.password, (err, ret) => {
                    if(ret) {
                        //convert login info into token 
                        const payload = {userId: result._id, email: result.email}
                        const token  = JWT.sign(payload, "aminKey");
                        return  res.json({success: true, message:"Login Successfully", token: token})
                    }else{
                        return res.json({success: false, message: "Password do not mactched"});
                    }
                })
            }else{
                res.json({success: false, message: "User not found"})
            }
        }).catch((err) => {
            res.json({success: true, message: "server error"})
        })
})




//fetch User details
router.get('/',  checkAuth,  (req, res) => {
    const id = req.userData.userId
    User.findOne({_id: id})
        .exec()
        .then((result) => {
            res.json({success: true, data: result})
        })
        .catch((err) => {
            res.json({success: false, messsage: "Server error"})
        })
})


module.exports = router;