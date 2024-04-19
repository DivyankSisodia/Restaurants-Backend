const mongoose = require('mongoose');
const colors = require('colors');
const { DB_URL } = require('./server-config');

const connect = async () => {
    await mongoose.connect(DB_URL);
    console.log('Database connected'.bgCyan)
}
module.exports = connect;
