const express = require('express');
const connectDB = require('./Database/db');
const router = require('./API/Routes/routes');
const authRoutes = require('./API/Routes/authRouter');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/V1/milkdata', router);
app.use('/V1/auth', authRoutes);

// Port
const PORT = process.env.PORT || 8000;

// Start server after DB connection
const startServer = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); // debug

        await connectDB();

        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(' Error starting server:', error);
        process.exit(1);
    }
};

startServer();