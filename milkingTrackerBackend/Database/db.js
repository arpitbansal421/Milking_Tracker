const db = require('mongoose');
const connectDB=async()=>{
    try{
        await db.connect(process.env.db_uri)
        console.log('MongoDB is connected Successfully');


    }catch(error){
        console.log('connection Failed');

    }

}
module.exports =connectDB;