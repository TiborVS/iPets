const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json({ limit: '100mb'}));
app.use(cors());

const usersRouter = require('./routes/usersRouter');
const petsRouter = require('./routes/petsRouter');
const visitsRouter = require('./routes/visitsRouter');
const treatmentsRouter = require('./routes/treatmentsRouter');
const medicationsRouter = require('./routes/medicationsRouter');
const foodRouter = require('./routes/foodRouter');
const authRouter = require('./routes/authRouter');

app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use('/visits', visitsRouter);
app.use('/treatments', treatmentsRouter);
app.use('/medications', medicationsRouter);
app.use('/food', foodRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log("Listening on port " + port);
})
