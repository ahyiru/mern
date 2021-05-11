import { UserOutlined, PoweroffOutlined, GithubOutlined } from '@ant-design/icons';

import themeList from '@app/configs/theme';

import defUser from '@app/assets/images/user/2.png';

import {components} from '@common';
const {Anico}=components;

export const leftNav=({i18ns})=>{
  const {nav:{left}}=i18ns;
  return [
    {
      name:left['collapse'],
      type:'collapse',
      Custom:({status})=><Anico type={(status?.value??status)?'right':''} />,
    },
  ];
};
export const rightNav=({i18ns,language,user,projList,themeKey})=>{
  const {nav:{right},theme}=i18ns;
  return [
    {
      name:user?.name??right['user'],
      img:user?.avatar??defUser,
      children:[
        {
          name:right['profile'],
          type:'profile',
          icon:<UserOutlined />,
          path:'/profile',
        },
        {
          name:right['logout'],
          type:'logout',
          icon:<PoweroffOutlined />,
          path:'/user/login',
        },
      ],
    },
    {
      // name:right['language'],
      name:right[language],
      Custom:()=><div className="icon"><img src={`${right[language+'_icon']}`} /></div>,
      // type:'language',
      children:[
        {
          key:'zh',
          name:right['zh'],
          type:'language',
          active:language==='zh',
          icon:<div className="img"><img src={`${right['zh_icon']}`} /></div>,
        },
        {
          key:'en',
          name:right['en'],
          type:'language',
          active:language==='en',
          icon:<div className="img"><img src={`${right['en_icon']}`} /></div>,
        },
        {
          key:'jp',
          name:right['jp'],
          type:'language',
          active:language==='jp',
          icon:<div className="img"><img src={`${right['jp_icon']}`} /></div>,
        },
      ],//projList,
    },
    {
      // name:left['themeList'],
      icon:'SettingOutlined',
      type:'themeList',
      // arrowDir:'lt',
      children:themeList(theme).map(v=>{
        v.key===themeKey&&(v.active=true);
        return v;
      }),
    },
    {
      icon:<GithubOutlined />,
      type:'link',
      link:'https://github.com/ihuxy/demo1',
    },
  ];
};

