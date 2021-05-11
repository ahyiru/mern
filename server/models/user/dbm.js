const listUser=(db,req,res)=>{
  db.find((error,result)=>{
    if(error){
      return res.status(res.statusCode).send({error});
    }
    return res.status(200).send({result});
  });
};
const addUser=(db,req,res)=>{
  const {body}=req;
  const user=new db(body);
  user.save((error,result)=>{
    if(error){
      return res.status(500).send({error});
    }
    return res.status(200).send({message:'添加成功！'});
  });
};
const editUser=(db,req,res)=>{
  const {body}=req;
  db.updateOne({_id:body._id},{$set:body},error=>{
    if(error){
      return res.status(500).send({error});
    }
    return res.status(res.statusCode).send({message:'更新成功！'});
  });
};
const deleteUser=(db,req,res)=>{
  const {body}=req;
  db.deleteOne({
    _id:body.ids[0],
  },error=>{
    if(error){
      return res.status(500).send({error});
    }
    return res.status(res.statusCode).send({message:'删除成功！'});
  });
};

module.exports={
  listUser,
  addUser,
  editUser,
  deleteUser,
};

