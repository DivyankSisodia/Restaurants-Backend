const colors = require('colors');
const express = require('express');
const connect = require('./config/database');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { PORT } = require('./config/server-config');
const ApiRoutes = require('./routes/index');


const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', ApiRoutes);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta);
    await connect();
});
