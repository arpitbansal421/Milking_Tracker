const db = require('mongoose');
const connectDB=async()=>{
    try{
        await db.connect(process.env.db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            retryWrites: true,
        });
        console.log('MongoDB is connected Successfully');
    }catch(error){
        console.error('MongoDB connection Failed:', error.message);
        process.exit(1);
    }
}
module.exports =connectDB;