
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const port = process.env.PUBLIC_PORT || 3000;
const { connection } = require('./config/db'); // Assuming `connection` is a promise
const misspellsData = require('./config/database');
const { misspellsModel } = require('./model/Misspells');
const mongoose = require('mongoose');
const CRUD_routes = require('./Routes/routes');
const cors = require('cors');
const joi=require('joi');
const { userModel } = require('./model/user.model');

app.use(express.json());
app.use(cors());

const schema=joi.object({
  email:joi.string().email().required(),
  password:joi.string().min(3).max(10).required()
})

const validateUserInput=(Input)=>{

  // console.log(email,password)
  const {error,value}=schema.validate(Input);

  if(error){
      console.log({message:"Validation failed", error})
      return false
  }else{
     console.log("Validation successfull")
     return true
  }
}

// app.use(validateUserInput)

app.get("/", async (req, res) => {
  res.status(200).send(`<h1>Database Connected Successfully</h1><p>Status Code: 200</p>`);
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});


app.post("/signup",async (req,res)=>{
    
   let result=validateUserInput(req.body);

   if(!result){
    res.send("Invalid data in the request");
    return;
   }
  
  try{
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({msg:"Validation & SignUp done Successfully",data:user.toJSON()})
  }catch(e){
    console.log(e)
    res.status(400).json({message:'Sign Up Failed', error: e})    
  }
  })

  // app.post("/login",(req,res)=>{
  //   const {username,password}=req.body;

  //   let user=userModel.findOne({username})

  //   if(user){
      
  //       const payload = { userId: user.id };
  //       const secretKey = 'AiMeN';

  //       const token = jwt.sign(payload, secretKey);

  //     res.send({"msg":"Logged In Successfully",token:token})
  //   }else{
  //     res.send({"msg":"Please Sign-Up First"})
  //   }
  
  // })



app.post('/postdata', (req, res) => {
  misspellsModel.insertMany(misspellsData)
    .then((result) => {
      console.log('Inserted', result.length, 'documents into the collection');
      res.status(200).send('Data inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting documents:', error);
      res.status(500).send('Failed to insert data');
    });
});

app.use("/routes", CRUD_routes);

app.listen(port, async () => {
  try {
    console.log(connection)
    await connection; // Wait for the database connection to be established
    console.log("Connected to DB");
    if (mongoose.connection.readyState === 1) {
      console.log('Connected to MongoDB');
    } else {
      console.log('Not connected to MongoDB');
    }
  } catch (error) {
    console.log("Error connecting to DB");
    console.error(error);
  }
  console.log(`Server is listening on port ${port}`);
});
