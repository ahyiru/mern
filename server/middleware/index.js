const middlewareDemo=(req,res,next)=>{
  console.log(req.originalUrl);
  next();
};

module.exports={
  middlewareDemo,
};



