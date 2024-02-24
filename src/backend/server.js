const express = require('express');
const pg = require('pg'); 
const cors = require('cors');



const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const verifyRouter = require('./routes/verify');

const dbConfig = require('./config/db');
const jwtConfig = require('./config/jwt');

const verifyToken = require('./middleware/authMiddleware'); 



const app = express();

app.use(cors());


// ...middleware setup
app.use(express.json());

// Connect to database
const pool = new pg.Pool(dbConfig);

app.set('pool', pool);

// User registration route
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', verifyRouter);


app.get('/', (req,res) => {
  res.send('home');

}
)

app.get('/protected', verifyToken, (req, res) => {
  res.send('response');
});

module.exports = app;

// Start server
app.listen(3000, () => console.log('Server listening on port 3000'));