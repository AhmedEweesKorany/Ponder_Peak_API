const mongoose = require('mongoose')

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.mongoose_connection)
        console.log("database connection established");
    } catch (error) {
        console.log("error connecting" );
    } 
}   

module.exports = connectDb  