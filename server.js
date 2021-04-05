let express = require('express');
const connectDB = require('./config/db');


let app = express();

let PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));


app.get('/',(req,res) =>  res.send('api listining'))

app.listen(PORT , () =>  console.log(`server started listing on port ${PORT}`))