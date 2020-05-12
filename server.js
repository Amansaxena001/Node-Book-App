if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const express=require("express")
const app=express()
const expressLayouts=require('express-ejs-layouts')
const indexRoute=require('./routes/index')



app.set('view engine','ejs')
app.set('views',__dirname+'/views')

app.set('layout','layouts/layouts')


//Init mongoDB
const mongoose=require('mongoose')
mongoose.connect(process.env.DATABSE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('\x1b[33m%s\x1b[0m','Connected to mongoDB'))
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRoute)

app.listen(process.env.PORT || 3002)
console.log('SERVER CONNECTED ON PORT 3002')