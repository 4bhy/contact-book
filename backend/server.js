const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const connectDB = require('./config/db')
const routes = require('./routes/routes')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*'
}))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

dotenv.config()

connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    next();
})

app.use('/api/', routes)

app.listen(process.env.PORT, () => {
    console.log("Connected to 5000");
})

