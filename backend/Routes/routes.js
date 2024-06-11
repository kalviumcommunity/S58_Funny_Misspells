const express=require('express');
const{misspellsModel}=require('../model/Misspells');
const CRUD_routes=express.Router();



CRUD_routes.get('/',async(req,res)=>{
    try{
        const misspells=await misspellsModel.find()
        // console.log(misspells)
        res.json(misspells)
    }catch(err){
        console.log(err)
        res.send({'Error':err})
    }
})


CRUD_routes.get('/created_by',async(req,res)=>{
    console.log("req",req)
    try{
        const misspells=await misspellsModel.find({created_by: req.query.created_by})
        console.log(misspells)
        res.json(misspells)
    }catch(err){
        console.log(err)
        res.send({'Error':err})
    }
})



CRUD_routes.post('/Create',async(req,res)=>{

    // console.log(req)
    
    // console.log(user)

    // const {email,password}=req.body;
    // const {error,value}=joiSchema.validate({email,password}) 
    // if(error){
    //     res.send({message:"authetication failed", error})
    //     return
    
    // }
    // else
    //     { res.send({message:"authetication successfull", error})

    // }

    const {Id,URL,caption,alt}=req.body;
    let payload={Id,URL,caption,alt};

    console.log(payload)
    try { 
        const newMisspells=new misspellsModel(payload)
        await newMisspells.save()
        // await misspellsModel.create(payload)
        console.log(newMisspells,payload);
        res.send({"message":"Misspells created successfully"})
        
    } catch (error) {
        res.send('Error '+error)
        
    }
})

CRUD_routes.put('/Update/:id',async(req,res)=>{
    let id=req.params.id
    let payload=req.body
    try {
        const misspells=await misspellsModel.findByIdAndUpdate(id,payload)
        res.json({"message":"Misspells updated successfully"})
    } catch(error){
        res.send('Error '+error)
    }
})

CRUD_routes.delete('/Delete/:id',async(req,res)=>{
    let id=req.params.id
    try {
        const misspells=await misspellsModel.findByIdAndDelete(id)
        res.json({"message":"Misspells deleted successfully"})
    } catch(error){
        res.send('Error '+error)
    }
})

module.exports=CRUD_routes