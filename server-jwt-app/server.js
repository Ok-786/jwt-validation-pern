//npm i express cors pg jsonwebtoken bcrypt
const express = require('express');
const app = express();
const cors = require('cors');
const jwtAuth = require('./routes/jwtAuth');
const dashboard = require('./routes/dashboard');
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/auth', jwtAuth);
app.use('/api/dashboard', dashboard);

app.listen(process.env.PORT || 8000, () => {
    console.log('server is online!');
})