export const browserRouter=!process.env.isDev;

const initPath=`${browserRouter?'':'#'}/`;

const beforeRender=input=>{
  const {path}=input;
  const validPath=path.split('?')[0];
  if(validPath===initPath){
    return {path:'/'};
  }
};

export default {
  browserRouter,
  beforeRender,
  // basepath,
  // afterRender,
  // store:createStore(),
};



