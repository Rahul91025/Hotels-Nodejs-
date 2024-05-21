const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // Use IPv4 address

console.log("Attempting to connect to MongoDB...");

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((err) => {
        console.error("MongoDB connection error: ", err);
    });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error("MongoDB error: ", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

module.exports = db;
