
var express = require("express");

 
var app = express();

 
var port = 3001;

 
var bodyParser = require('body-parser');

 
app.use(bodyParser.json());

 
app.use(bodyParser.urlencoded({ extended: true }));

const cors=require('cors');
app.use(cors());

 
 

 
var mongoose = require("mongoose");
const { request } = require("express");

 
mongoose.Promise = global.Promise;

 
mongoose.connect("mongodb://localhost:27017/ebayproject");

var credentials = [
  {
    uid:'muttu',password:'123456'
      
    }
  ]

  const jwt =require('jsonwebtoken');
const e = require("express");

var nameSchema1 = new mongoose.Schema({

 
  // uid: String,
  eid: String,
 ename: String, 
 pname: String,
 location: String,
 date: Date,
 hrs: String
  
  // password: password
  
   
  });

  
var nameSchema2 = new mongoose.Schema({

 
  // uid: String,
  eid: String,
  ename: String, 
  address: String,
  date: Date,
  phone: Number,
  salary:String



  
// password: password
  });

 


 var attendence = mongoose.model("attendence", nameSchema1);
var employee =mongoose.model("employee", nameSchema2);

 

 
app.get("/", (req, res) => {

 
res.sendFile(__dirname + "/index.html");
});
app.get("/Attendence", (req, res) => {
  res.sendFile(__dirname + "/Attendence.html");
});

app.get("/EmployeeForm", (req, res) => {
  res.sendFile(__dirname + "/EmployeeForm.html");
});
 
 app.post("/login", (req, res) => {

  let result = credentials.find(use => use.uid == req.body.uid);
    if(result) {
      if(result.password == req.body.password) {
        // res.status(200).send (
        //   {
        //     message: "Successful login"
        //   }
        // )
        jwt.sign({credentials},'secretkey',(err,token)=>{

          res.json({
            token
          })
      
         });

        // var myData = new User(req.body);
        // myData.save()
      } else {
        res.status(201).send({
          message:"password incorrect"
        })
      }
      }else {
        res.status(201).send({
          message:"user incorrect"
        })
      }
  })
//  var myData = new User(req.body);
//  myData.save()
// .then(item => {
// res.send("Name saved to database");
// })
// .catch(err => {
// res.status(400).send("Unable to save to database");
// });
// });

app.post("/Attendence",verifyToken, (req, res) => {
  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
  var myData = new attendence(req.body);
  myData.save()
 .then(item => {
 res.send("Attendence information saved to database");
 })
 .catch(err => {
 res.status(400).send("Unable to save to database");
 });

}
  })
});


 app.post("/EmployeeForm",verifyToken, (req, res) => {

  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
       var myData = new employee(req.body);
 myData.save()
.then(item => {
res.send("Employee information updated to database");
})
.catch(err => {
res.status(400).send("Unable to save to database");
});

    }
  })

});


app.get('/salary', function(req, res){

  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{

  employee.find(function(err, response){
     res.json(response);
  });
}
  })
});



function verifyToken(req,res,next){
  const bearerHeader=req.headers['authorization'];
  if(typeof bearerHeader!=='undefined'){

    const bearer=bearerHeader.split(' ');
    const bearerToken=bearer[1];
    req.token=bearerToken;
    next();

  }else{
    res.sendStatus(403);
  }
}


 

 
app.listen(port, () => {

 
console.log("Server listening on port " + port);

 
});

module.exports = app;
