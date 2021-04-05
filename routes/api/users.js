const express = require("express");
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

//router.get('/', (req, res) => res.send("api users"));

router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password','please enter password with 6 or more charectors').isLength({min:6})
], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
        }
    
    console.log(req.body);
    res.send('api users');
})

module.exports = router;