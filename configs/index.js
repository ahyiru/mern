const app={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT||8080,
  PRO_PORT:process.env.PRO_PORT||8081,
  BUILD_DIR:'../build',
  PUBLIC_DIR:'../public',
  MONGO_URL:'mongodb://localhost:27017/mern',
  PROXY_URL:'http://localhost:8888',
  SERVER_PORT:8888,
};

module.exports=app;
