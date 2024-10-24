const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const cookieParser=require("cookie-parser")
app.use(cookieParser())
const constant=require("./src/config/constant.js")
const port = constant.PORT
require("./src/config/db")
const cors=require("cors")
app.use(cors())
const SocietyRoutes=require("./src/routes/society.route")
const UserRoutes= require("./src/routes/user.route");
const NumberRoutes=require("./src/routes/number.route.js")


//user registration and login schema 
app.use("/api/v1/auth",UserRoutes)

//create society api
app.use("/api/v1/society",SocietyRoutes)
//create Important Number
app.use("/api/v2/number",NumberRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))