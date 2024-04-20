const colors = require('colors');
const express = require('express');
const connect = require('./config/database');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server-config');
const ApiRoutes = require('./routes/index');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', ApiRoutes);
app.use('/home', (req, res) => {
    res.json({
        message: 'Welcome to home page'
    });
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta);
    await connect();
});
