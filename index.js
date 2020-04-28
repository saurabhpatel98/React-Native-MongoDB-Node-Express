const express  = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 

const PORT = 3000
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const {mongourl} = require('./keys')
require('./models/User');
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')

app.use('/',authRoutes)

mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo using mongourl")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})

app.get('/',requireToken,(req,res)=>{
    //res.send("Your email is " +req.user.email)
    res.send("Your email is " +req.user.password)
})
app.listen(PORT,()=>{console.log("SERVER is Connected",PORT)})