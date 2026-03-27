import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authUser from '../server/routers/user/user-router.js';
import authVendor from '../server/routers/vendor/vendor-router.js';
import contact from '../server/routers/contact/contact-router.js';
import address from '../server/routers/address/address-router.js';
import user from '../server/routers/user/user-realated-route.js';
import scrapRequest from '../server/routers/user/scrap-request-route.js';


//Connection for mongo ,id : suchitrakumar098@gmail.com
try{
    mongoose.connect('mongodb://daleisuchitra22:Dalei%40123@mernstack-youtube-shard-00-00.vjq7s.mongodb.net:27017,mernstack-youtube-shard-00-01.vjq7s.mongodb.net:27017,mernstack-youtube-shard-00-02.vjq7s.mongodb.net:27017/kawardiwala?ssl=true&replicaSet=atlas-wsy7oq-shard-0&authSource=admin&appName=mernStack-youtube').then(()=>
    {
        console.log("mongo connect successfully");
    }).catch((e)=>{
        console.log(e);
    })
}catch(e){
    console.log(e)
}


// creation of server  with express
const server = express();

//require middleware 
console.log("Frontend URL : ",process.env.FRONTED_URL);
server.use(
    cors({
        origin : process.env.FRONTED_URL,
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

const PORT = process.env.PORT || 3500 ;
server.listen(PORT,()=>{
    console.log(`Server now running on Port ${PORT}`);
})