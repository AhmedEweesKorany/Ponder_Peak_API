const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require("./config/db")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")

dotenv.config()
//database configuration
dbConnect()

const app = express();

const Port = process.env.PORT || 5000
// Middleware to parse JSON request bodies
app.use(cors())
app.use(express.json());
app.use("/api/users",require("./routes/userRoutes"))

// handle undefined routes
app.use(errorHandler.invalidRoute)
// Middleware to handle error responses
    
app.use(errorHandler.errResponserHandler)


app.listen(Port, (req, res) => {
    console.log(`Server is running on http://localhost:${Port}`);
})