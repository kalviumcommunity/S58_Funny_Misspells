
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

  app.post("/login", async (req,res)=>{
    const {email,password}=req.body;
console.log(email,password)
    let user=await userModel.findOne({email})

    if(user){
      console.log(user, "user")
        // const payload = { userId: user.id };
        const secretKey = 'AiMeN';
        let token = jwt.sign({
          userId: user._id
        }, secretKey);

      res.send({"msg":"Logged In Successfully",token:token})
    }else{
      res.send({"msg":"Please Sign-Up First"})
    }
  
  })



app.post('/postdata', async (req, res) => {
  // console.log(req.headers,"token")
  // console.log(req.headers.authorization, "92")
  // console.log(req.body,"body")
// console.log(req.headers, "Header")
// console.log(req.headers.authorization)
let token = req.headers.authorization
let decoded = await jwt.verify(token, 'AiMeN', function(err, decoded) {
  if (err) {
    console.log(err)
  }
  else{
    return decoded;
  }
});
if (decoded.userId) {
  console.log(req.body, 'body')
  let newObject= {...req.body,created_by:decoded.userId}
  console.log(newObject, 'newObject')
  misspellsModel.insertMany(misspellsData)
    .then((result) => {
      console.log('Inserted', result.length, 'documents into the collection');
      res.status(200).send('Data inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting documents:', error);
      res.status(500).send('Failed to insert data');
    });
    console.log("postdata")

    res.send("Data Inserted Successfully")
}



  
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
