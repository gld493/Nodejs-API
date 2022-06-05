const config = require('./config/config');
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require('./routes/auth')
const blogsRoute = require('./routes/blogs')


app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/blogs', blogsRoute)


mongoose.connect(config.mongoose.url,config.mongoose.options )
const db = mongoose.connection

db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})

app.listen(config.port, () => {console.log("Server started: " + config.port)})