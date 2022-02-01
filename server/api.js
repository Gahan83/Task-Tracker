var express = require('express')
var cors = require('cors')
var app = express()

var mongodb = require('mongodb').MongoClient


var url="mongodb://127.0.0.1:27017"

//express config
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cors());

app.get("/getallproducts",function(request, response)
{
  mongodb.connect(url,function(error,clientobject)
  {
    if(!error)
    {
      var datadbobject=clientobject.db("task-tracker");
      datadbobject.collection("Products").find().toArray(function(error,docs){
        if(!error)
        {
          response.send(docs);
        }
      })
    }
  })
});

app.post("/addproducts",function(request, response)
{
  console.log(request);
  mongodb.connect(url,function(error,clientobject)
  {
    if(!error)
    {
      var datadbobject=clientobject.db("task-tracker");
      var data={
        p_id: parseInt(request.body.p_id),
        text:request.body.text,
        day:request.body.day,
        reminder:request.body.reminder
      }
      datadbobject.collection("Products").insertOne(data,function(error,docs){
        if(!error)
        {
          console.log("product added successfully!");
          response.send(docs);
        }
      })
    }
  })
});

app.put("/updateproducts",function(request, response)
{
  mongodb.connect(url,function(error,clientobject)
  {
    if(!error)
    {
      var datadbobject=clientobject.db("task-tracker");
      var data={
        p_id: parseInt(request.body.p_id),
        text:request.body.text,
        day:request.body.day,
        reminder:request.body.reminder
      }
      datadbobject.collection("Products").fin(data,function(error,docs){
        if(!error)
        {
          console.log("product added successfully!");
          response.send(docs);
        }
      })
    }
  })
});


app.listen(8080);
console.log("Server started");

