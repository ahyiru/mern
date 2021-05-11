const routers=[
  {
    path:'/',
    name:'首页',
    icon:'HomeOutlined',
    denied:false,
    component:()=>import('@common/layout'),
  },
  {
    path:'/404',
    name:'404',
    denied:false,
    component:import('@app/404'),
    hideMenu:true,
  },
];

export default routers;



