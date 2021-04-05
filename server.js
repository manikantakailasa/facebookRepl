let express = require('express');

let app = express();

let PORT = process.env.PORT || 5000;

app.get('/',(req,res) =>  res.send('api listining'))

app.listen(PORT , () =>  console.log(`server started listing on port ${PORT}`))