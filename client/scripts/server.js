const express = require('express');
const path=require('path');
const colors=require('colors');
const cors=require('cors');
const logger=require('morgan');
const bodyParser=require('body-parser');

const app = express();

const {HOST,PRO_PORT,PROXY_URL,BUILD_DIR}=require('../../configs');

const {createProxyMiddleware}=require('http-proxy-middleware');

const proxyCfg=require('./appProxy');

const {prefix,opts}=proxyCfg(PROXY_URL);
app.use(prefix,createProxyMiddleware(opts));

app.set('host',HOST);
app.set('port',PRO_PORT);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));

const build=path.resolve(__dirname,BUILD_DIR);

app.use(express.static(build));

app.get('*',function(request,response){
  response.sendFile(path.resolve(build,'index.html'));
});

app.listen(app.get('port'),(err)=>{
  if (err) {
    console.log(err);
    return false;
  }
  console.log('\n服务已启动! '.black+'✓'.green);
  console.log(`\n监听端口: ${app.get('port')} ,正在构建,请稍后...`.cyan);
  console.log('-----------------------------------'.grey);
  console.log(` 本地地址: https://${app.get('host')}:${app.get('port')}`.magenta);
  console.log('-----------------------------------'.grey);
  console.log('\n按下 CTRL-C 停止服务\n'.blue);
});


