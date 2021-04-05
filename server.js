let express = require('express');
const connectDB = require('./config/db');


let app = express();

let PORT = process.env.PORT || 5000;

connectDB();

app.get('/',(req,res) =>  res.send('api listining'))

app.listen(PORT , () =>  console.log(`server started listing on port ${PORT}`))