const express = require("express");
const { check, validationResult } = require('express-validator/check');

const User = require('../../modules/User');
const gravator = require('gravatar');
const bcrypt = require('bcryptjs');

const router = express.Router();

//router.get('/', (req, res) => res.send("api users"));

router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password','please enter password with 6 or more charectors').isLength({min:6})
], async (req, res) => {
    
    const { email, name, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findOne({ email });
        if (user)
        {
            return res.status(400).json({ error: [{ msg: 'User already exists' }] });
        }
        
        const avatar = gravator.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
         console.log(req.body);
        res.send('user Registered');

    }
    catch (error)
    {
        console.log(error.message)
        return res.status(500).send('server error');
    }
})

module.exports = router;