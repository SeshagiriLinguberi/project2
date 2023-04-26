const express = require('express');
const bodyParser = require('body-parser')

const app = express();
let port=8080;
let employees= [
    {
        id:123,
        email:"abc@gmail.com",
        personalDetals:
    {
        name:"chinna",
        mobile:1234567890,
        salary:120000
    }},
    {  
         id:456,
        email:"def@gmail.com",
        personalDetals:
        {
            name:"naresh",
            mobile:1234567890,
            salary:120000
        }},
        {
            id:789,
            email:"ghi@gmail.com",
            personalDetals:
            {
                name:"suresh",
                mobile:1234567890,
                salary:120000
            }}
];

app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))

app.get('/api/get/users',function(req,res){
    res.send(
        {statusCode:200,
        status:true,
        error:false,
        responseData:employees});
})
app.post('/api/get/user/by/id',function(req,res){
    let userid = req.body;
    console.log("enterd in to id block");
    let status=false;
    let userInfo = employees.filter((value)=>{
     if(value.id==userid.id)
     {
        status=true;
         return value;
     }
    
    })
    if(status)
    {
        
        res.send({statusCode:200,
            status:true,
            error:false,
            responseData:userInfo});
    }
    else
    {
        res.send({statusCode:-999,
            status:false,
            error:true,
            message:"user not found"});
    }
   
})

app.post('/api/add/user',function(req,res){
    let newUser=req.body;
    employees.push(newUser);
    res.send(
        {statusCode:200,
        status:true,
        error:false,
        responseData:newUser});
})

app.post('/api/update/user/by/id',function(req,res){

    let userid=req.body;
    let status=false;
     employees.filter((value)=>{
        if(userid.id==value.id)
        {
                value.personalDetals.mobile="updated";
                value.personalDetals.name="updated";
                status=true;
        }
    })
    if(status)
    {
        res.send({statusCode:200,
            status:true,
            error:false,
            responseData:employees});
    }
    else
    {
        res.send({statusCode:-999,
            status:false,
            error:true,
            message:"User not found"});
    }
    
})

app.post('/api/delete/user/by/id',function(req,res){

    let userid=req.body;
    let status=false;
    let newData;
    employees.filter((value)=>{
        if(userid.id==value.id)
        {
            status=true;

             newData = employees.filter((value)=>{
                if(value.id!=userid.id)
                {
                    return value;
                }
            })
        }
    })
    if(status)
    {
        res.send({statusCode:200,
            status:true,
            error:false,
            responseData:newData});
    }
    else
    {
        res.send({statusCode:-999,
            status:false,
            error:true,
            message:"user not found"});
    }
    
})


app.listen(port,(req,res)=>{
    console.log(`server running on local host ${port}`);
})