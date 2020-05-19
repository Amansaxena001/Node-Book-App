if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const express=require("express")
const app=express()
const expressLayouts=require('express-ejs-layouts')
const indexRoute=require('./routes/index')
const authorRoute=require('./routes/authors')
const booksRoute=require('./routes/books')

const bodyParser=require('body-parser')




app.set('view engine','ejs')
app.set('views',__dirname+'/views')

app.set('layout','layouts/layouts')
app.use(bodyParser.urlencoded({limit:'10mb',extended:false})) //sending values via URL


//Init mongoDB
const mongoose=require('mongoose')
mongoose.connect(process.env.DATABSE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('\x1b[33m%s\x1b[0m','Connected to mongoDB'))
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRoute)
app.use('/authors',authorRoute)
// app.use('/authors/new',authorRouter)
app.use('/books',booksRoute)


app.listen(process.env.PORT || 3002)
console.log('\x1b[35%s\x1b[0m','SERVER CONNECTED ON PORT 3002')