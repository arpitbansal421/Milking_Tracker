const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Database/db')
const router = require('./API/Routes/routes')
const authRoutes = require('./API/Routes/authRouter')
const cors =require('cors')
const protect =require('./Middleware/authMiddleware')
dotenv.config({ path: './config/.env' });


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/V1/milkdata',router);
app.use('/V1/auth', authRoutes);
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
});