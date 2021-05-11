const mongoose=require('mongoose');
const modelName='user';
const schemas={
  name: { type: String, required: true, unique: true, index: true, trim: true },
  email: { type: String, required: true },
  password: { type: String },
  age: { type: Number },
  sex: { type: String },
};
const dataSchema=new mongoose.Schema(schemas);

module.exports={modelName,dataSchema};


