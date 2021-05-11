const express = require('express');
const colors=require('colors');
const cors=require('cors');
const logger=require('morgan');
const bodyParser=require('body-parser');
const rateLimit=require('express-rate-limit');

const {SERVER_PORT}=require('../configs');

const TIMEOUT=120*1000;

const app=express();

const limiter=rateLimit({
  windowMs:5 * 60 * 1000,
  max:150,
  message:{
    message:'请求太频繁，请稍后再试！',
    code:429,
  },
});
app.use(limiter);

app.use((req,res,next)=>{
  res.setTimeout(TIMEOUT,()=>{
    return res.status(504).send({message:'服务端请求超时！'});
  });
  next();
});

app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));

app.listen(SERVER_PORT,err=>{
  if(err){
    console.log(err);
    return false;
  }
  console.log('\nmongodb数据服务已启动！'.black+'✓'.green);
  console.log(`\n监听端口: ${SERVER_PORT}`.cyan);
});

// startServer
const startServer=require('./models');
startServer(app);

