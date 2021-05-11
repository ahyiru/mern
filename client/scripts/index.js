const os=require('os');
const express=require('express');
const webpack=require('webpack');
const colors=require('colors');
const cors=require('cors');
const logger=require('morgan');
const bodyParser=require('body-parser');

const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware');

const webpackConfig=require('./webpack.development');

const {HOST,PORT,PROXY_URL}=require('../../configs');

const getIPs=require('./getIPs');

const {createProxyMiddleware}=require('http-proxy-middleware');

const app = express();

const compiler = webpack(webpackConfig);

const proxyCfg=require('./appProxy');

const {prefix,opts}=proxyCfg(PROXY_URL);
app.use(prefix,createProxyMiddleware(opts));

const devMiddleware=webpackDevMiddleware(compiler,{
  publicPath:webpackConfig.output.publicPath,
  stats: {
    preset: 'minimal',
    moduleTrace: true,
    errorDetails: true,
    colors:true,
  },
});

app.use(webpackHotMiddleware(compiler));
app.use(devMiddleware);

app.set('host', HOST);
app.set('port', PORT);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));

// browserRouter
app.get('*',(req,res)=>{
  const htmlBuffer=devMiddleware.outputFileSystem.readFileSync(`${webpackConfig.output.path}/index.html`);
  res.send(htmlBuffer.toString());
});

const server=app.listen(app.get('port'),err=>{
  if(err){
    console.log(err);
    return false;
  }
  console.log('\n服务已启动! '.black+'✓'.green);
  console.log(`\n监听端口: ${app.get('port')} ,正在构建,请稍后...`.cyan);
  console.log('-----------------------------------'.grey);
  console.log(`运行地址: \n`.magenta);
  console.log(`${getIPs(os.networkInterfaces(),app.get('port'))} \n`.magenta);
  console.log(`如需打包部署到生产环境，请运行 `.black+`npm run build`.cyan);
  console.log('-----------------------------------'.grey);
  console.log('\n按下 CTRL-C 停止服务\n'.blue);
});

