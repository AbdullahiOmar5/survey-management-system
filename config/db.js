const mongoose = require('mongoose');
const online = 'mongodb+srv://axmed:C2oYfBD7xUYKKKwV@cluster0.rl1r3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    try {
        // 'mongodb://127.0.0.1:27017/survey-Management'
        // await mongoose.connect(online);
        await mongoose.connect('mongodb://127.0.0.1:27017/surveym');
        
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Stop the app if the database fails to connect
    }
};

module.exports = connectDB;
