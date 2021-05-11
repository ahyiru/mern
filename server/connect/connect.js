const mongoose=require('mongoose');

const defaultOpts=require('./dataOpts');

const connectDB=(MONGO_URL,dataOpts=defaultOpts)=>{
  const createDB=mongoose.createConnection(MONGO_URL,dataOpts);
  createDB.on('error',err=>{
    console.log(`数据库[${MONGO_URL}]连接失败！`.red);
  });
  createDB.once('open',res=>{
    console.log(`数据库[${MONGO_URL}]连接成功！`.green);
  });
  return createDB;
};

module.exports=connectDB;


















