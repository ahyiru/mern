const connectDB=require('./connect');
const {MONGO_URL}=require('../../configs');

const connectModel=connectDB(MONGO_URL);

const createModel=({modelName,dataSchema})=>connectModel.model(modelName,dataSchema);

module.exports=createModel;

