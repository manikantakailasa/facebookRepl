const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.send('api posts'));

module.exports = router;