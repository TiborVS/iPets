const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());

const usersRouter = require('./routes/usersRouter');
const petsRouter = require('./routes/petsRouter');

app.use('/users', usersRouter);
app.use('/pets', petsRouter);

app.listen(port, () => {
    console.log("Listening on port " + port);
})
