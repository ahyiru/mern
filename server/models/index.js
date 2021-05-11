const userApis=require('../../configs/apis');
const startUser=require('./user');

const start=app=>{
  startUser(app,userApis);
};

module.exports=start;
