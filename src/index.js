const colors = require('colors');
const express = require('express');
const connect = require('./config/database');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { PORT } = require('./config/server-config');
const ApiRoutes = require('./routes/index');


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ApiRoutes);

app.use('/', (req, res) => {
    res.send('Welcome to Restaurant App');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta);
    await connect();
});
