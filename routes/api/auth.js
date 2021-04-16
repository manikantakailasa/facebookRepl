const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../modules/User');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//authenticat user
router.get('/', auth, async (req, res) => {
    
    try
    {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
        
    }
    
});


//login user
router.post('/', [
    check('email', 'please enter valid email').isEmail(),
    check('password','password is required').exists()
], async (req, res) => {

    try {

        const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).send({ errors: errors.array() });
    }
    
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ errors: [{ msg: "Invalid credentials" } ]});
    }

    const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.status(400).send({errors: [{ msg: 'invalid credentials' }]});
    }

    const paylod = {
        user: {
            id : user.id
        }
    }


    jwt.sign(paylod, config.get('jwtsecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) {
            throw err;
        }
        res.json({ token });
    })

    } catch (err)
    {
        res.status(500).send('server error');
    }
    

    
});

module.exports = router;