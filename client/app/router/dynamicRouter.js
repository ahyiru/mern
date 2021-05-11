const routers=[
  {
    path:'/users',
    name:'用户管理',
    icon:'UsergroupAddOutlined',
    denied:false,
    component:()=>import(`@app/views/users`),
  },
  {
    path:'/users/add',
    name:'添加用户',
    hideMenu:true,
    denied:false,
    component:()=>import(`@app/views/users/add`),
  },
  {
    path:'/users/edit/:id',
    name:'编辑用户',
    denied:false,
    component:()=>import(`@app/views/users/add`),
  },
];

export default routers;



