const db=require('./createDb');
const dbm=require('./dbm');
const {target}=require('../../../configs/apis/configs');

const startDb=(app,apis)=>{
  Object.keys(apis).map(v=>{
    const {url,method='get'}=apis[v];
    app[method](`${target}${url}`,(req,res)=>{
      dbm[v](db,req,res);
    });
  });
};

module.exports=startDb;