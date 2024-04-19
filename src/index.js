const colors = require('colors');
const express = require('express');
const connect = require('./config/database');
const user = require('./models/user');
const { PORT } = require('./config/server-config');
const app = express();

app.listen(PORT, async () => {

    console.log(`Server is running on port ${PORT}`.bgMagenta);
    await connect();
    // const newUser = new user({
    //     name: 'John Doe',
    //     email: 'jo@gmail.com',
    //     password: '123456',
    //     address: ['123 Main Street', 'Apt 1'],
    //     phone: '1234567890',
    //     userType: 'admin'
    // })
    // await newUser.save();
});
