const mongoose=require('mongoose')
const path=require('path')
const coverImg='uploads/bookcover'

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    publishDate:{
        type:Date,
        required:true
    },
    pageCount:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    coverImageName:{
        type:String,
        required:true
    },author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }
})

bookSchema.virtual('coverImg').get(function(){
    if(this.coverImageName !=null){
        return path.join('/',coverImg,this.coverImageName)

    }
})
module.exports=mongoose.model('Book',bookSchema)
module.exports.coverImg=coverImg