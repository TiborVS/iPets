const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());

const usersRouter = require('./routes/usersRouter');
const petsRouter = require('./routes/petsRouter');
const visitsRouter = require('./routes/visitsRouter');
const treatmentsRouter = require('./routes/treatmentsRouter');
const medicationsRouter = require('./routes/medicationsRouter');

app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use('/visits', visitsRouter);
app.use('/treatments', treatmentsRouter);
app.use('/medications', medicationsRouter);

app.listen(port, () => {
    console.log("Listening on port " + port);
})
