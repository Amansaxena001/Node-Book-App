const express=require('express')
const router =express.Router()
const Author =require('../models/author')

//All authors route
router.get('/',async(req,res)=>{
    let searchOpt={}
    if(req.query.name!=null && req.query.name!==''){
        searchOpt.name=new RegExp(req.query.name,'i')//i means case insensitive
    }                   //get request sends data as a query
    try{
    const authors=await Author.find({searchOpt})
    res.render('authors/index',{
        authors:authors,
        searchOpt:req.query})

    }catch{
        res.redirect('/')

    }
})


//New author route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})


//create author
router.post('/',async(req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try{
              const newAuthor=await author.save()
                // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
    }catch{

        res.render('authors/new',{
                            author:author,
                            errorMessage:'Error creating new Author'
                        })
    }
})

module.exports=router