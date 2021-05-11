import {useState,useEffect} from 'react';
// import Topbar from '../topbar';
import Header from '../header';
import Main from '../main';
import {utils,use} from '@common';
const {useWinResize}=use;
import getThemeList from '@app/configs/theme';
import './index.less';
const {storage,a2o}=utils;

const formatMenu=(menu,curPath,type='sideMenu',cb=null)=>{
  const menuConfig={
    sideMenu:null,
    navMenu:null,
  };
  if(type==='navMenu'){
    menuConfig[type]=menu.length>1?menu:menu[0]?.children;
    return menuConfig;
  }
  const navMenu=menu.map(v=>{
    const {children,...rest}=v;
    if(v.path===curPath){
      menuConfig.sideMenu=children;
    }
    return rest;
  });
  menuConfig.navMenu=menu.length>1?navMenu:null;
  return menuConfig;
};

const Index=props=>{
  const {menu,current,store,i18ns}=props;
  const themeList=getThemeList(i18ns?.theme);
  const [menuType,setMenuType]=useState('sideMenu');
  const [collapsed,setCollapsed]=useState(false);
  const [theme,setTheme]=useState(storage.get('theme')||themeList[0]);
  const {width}=useWinResize();
  useEffect(()=>{
    const {subscribe}=store||{};
    if(subscribe){
      subscribe('set-theme',({theme,save})=>{
        const list=theme;
        const newTheme={
          name:'custom',
          key:'custom',
          list,
        };
        if(save){
          storage.set('theme',newTheme);
        }
        setTheme(newTheme);
      });
      subscribe('set-menuType',result=>setMenuType(result.menuType?'navMenu':'sideMenu'));
    }
  },[]);
  const switchTheme=type=>{
    const current=themeList.find(v=>v.key===type)||themeList[0];
    storage.set('theme',current);
    setTheme(current);
    store.setState({'switch-theme':current});
  };
  const handleCollapse=status=>setCollapsed(prev=>status==null?!prev:status);
  
  const {sideMenu,navMenu}=formatMenu(menu,current[0]?.path,menuType);

  return <div className={`frame${collapsed?' collapsed':''}`} style={a2o(theme.list)}>
    <header className="frame-header">
      {/* <Topbar {...props} /> */}
      <Header {...props} navMenu={width<768?[]:navMenu} handleCollapse={handleCollapse} collapsed={collapsed} switchTheme={switchTheme} theme={theme} width={width} />
    </header>
    <main className="frame-main">
      <Main {...props} menu={width<768?menu:sideMenu} collapsed={collapsed} handleCollapse={handleCollapse} width={width} />
    </main>
  </div>;
};

export default Index;

