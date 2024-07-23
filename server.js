const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require("./config/db")

dotenv.config()
//database configuration
dbConnect()

const app = express();

const Port = process.env.PORT || 5000
// Middleware to parse JSON request bodies

app.use(express.json());
app.use("/api/users",require("./routes/userRoutes"))

// Middleware to log incoming requests

app.listen(Port, (req, res) => {
    console.log(`Server is running on http://localhost:${Port}`);
})