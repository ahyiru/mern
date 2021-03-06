## 登录系统设计（jwt鉴权、邮件发送、oauth登录）

![login](../images/login.png)

jwt可使用用户信息、当前时间、过期时间等，通过TOKEN_SECRET来设置token。当和后端交互时，会去验证当前token是否有效，如果验证通过，则可进行数据交互，否则退出系统。

注册用户时，会通过nodemailer来发送激活邮件，用户点击激活链接才可完成注册。

忘记密码也需要发邮件验证邮箱，点击重置密码链接，才能继续修改密码。

### jwt鉴权

```javascript
const jwt=require('jwt-simple');
const moment=require('moment');
const {TOKEN_SECRET}=require('../configs');
moment.locale('zh_cn');

const jwtDecode=token=>jwt.decode(token,TOKEN_SECRET);
const jwtEncode=token=>jwt.encode(token,TOKEN_SECRET);

const createJWT=(user,delay=1)=>{
  const payload={
    sub:user._id,
    iat:moment().unix(),
    exp:moment().add(delay,'days').unix(),
  };
  return jwtEncode(payload);
};

const ensureAuthenticated=(req,res,next)=>{
  if(!req.header('Authorization')){
    return res.status(401).send({message:'用户未登录，请登录后操作!'});
  }
  const token=req.header('Authorization').split(' ')[1];
  let payload=null;
  try{
    payload=jwtDecode(token);
  }catch(err){
    return res.status(401).send({message:err.message});
  }
  if(!payload.active){
    return res.status(401).send({message:'验证信息错误，请重新登录!'});
  }
  if(payload.exp<=moment().unix()){
    return res.status(401).send({message:'验证信息过期，请重新登录!'});
  }
  req.user=payload.sub;
  next();
};

```

### nodemailer发送邮件

```javascript
const sendEmail=to=>{
  const transporter=nodemailer.createTransport({
    host:'smtp.qq.com',
    port:465,
    secure:true,
    auth:{
      user:'address',
      pass:'123456',
    },
  });
  const mailOptions={
    from:`address`,
    to,
    subject:'Subject',
    text:`plaintext body`,
    html:`html body`,
  };
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      return error;
    }
    return info;
  });
};

```

### oauth登录

以github登录为例。

```javascript
const GITHUBCFG={
  accessTokenUrl:'https://github.com/login/oauth/access_token',
  userApiUrl:'https://api.github.com/user',
  client_id:'client_id',
  client_secret:'client_secret',
  redirect_uri:'redirect_uri',
}

const github=(db,req,res)=>{
  const {accessTokenUrl,userApiUrl,...rest}=GITHUBCFG;
  const {code}=req.body;
  const query={code,...rest};
  request.post({url:accessTokenUrl,qs:query,json:true},(err,response,token)=>{
    const headers={
      'User-Agent':'test',
      Authorization:`token ${token?.access_token}`,
    };
    request.get({url:userApiUrl,headers,json:true},(err,response,profile)=>{
      db.find({github:profile.id},(err,existingUser)=>{
        if(existingUser){
          return res.send({token:createJWT(user),result:user});
        }
        const user=new db({
          github:profile.id,
          avatar:profile.avatar_url,
          name:profile.name,
          email:profile.email,
        });
        user.save(error=>{
          if(error){
            return res.status(500).send({message:error.message});
          }
          return res.status(res.statusCode).send({token:createJWT(user)});
        });
      });
    });
  });
};

```













