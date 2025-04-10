const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authUser = require('../server/routers/user/user-router')
const authVendor = require('../server/routers/vendor/vendor-router')
const contact = require('../server/routers/contact/contact-router')
const address = require('../server/routers/address/address-router')
const user = require('../server/routers/user/user-realated-route')
const scrapRequest = require('../server/routers/user/scrap-request-route')


//Connection for mongo ,id : suchitrakumar098@gmail.com
try{
    mongoose.connect('mongodb+srv://suchitrakumar098:Dalei123@e-kawadiwala.cqjs6.mongodb.net/').then(()=>
    {
        console.log("mongo connect successfully");
    }).catch(()=>{
        console.log("some error occured while connect to Mongo");
    })
}catch(e){
    console.log(e)
}


// creation of server  with express
const server = express();

//require middleware 
server.use(
    cors({
        origin : "http://localhost:5173",
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders :[
            'content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true,
    })
)
server.use(cookieParser());
server.use(express.json());
server.use('/api/auth/user',authUser);
server.use('/api/auth/vendor',authVendor);
server.use('/api/user/address',address);
server.use('/api/contact',contact);
server.use('/api/prices',user);
server.use('/api/scrap',scrapRequest);


const PORT = 3500;
server.listen(PORT,()=>{
    console.log(`Server now running on Port ${PORT}`);
})