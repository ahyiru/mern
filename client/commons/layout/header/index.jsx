import {useState,useEffect} from 'react';
import {leftNav,rightNav} from '@app/configs/nav';
import HoriMenu from '../components/horiMenu';
import NavList from '../components/navList';
import logo from '@app/assets/images/logo.png';
import './index.less';

const Index=props=>{
  const {handleCollapse,collapsed,switchTheme,navMenu,user,theme,store}=props;
  const i18ns=store.getState('i18ns');
  const language=store.getState('language');
  const {title}=i18ns;
  const [leftList,setLeftList]=useState(leftNav({i18ns}));
  const [rightList,setRightList]=useState(rightNav({i18ns,language,user:user?.result,themeKey:theme.key}));
  useEffect(()=>{
    const profile=store.getState('profile');
    setLeftList(leftNav({i18ns}));
    setRightList(rightNav({i18ns,language,user:profile,themeKey:theme.key}));
  },[i18ns,user]);
  useEffect(()=>{
    const {subscribe,setState}=store||{};
    if(subscribe){
      subscribe('update-nav',result=>{
        const {type,data}=result;
        if(type==='left'){
          setLeftList(data);
          setState({'nav-data':{leftList:data}});
        }
        if(type==='right'){
          setRightList(data);
          setState({'nav-data':{rightList:data}});
        }
      });
      setState({'nav-data':{leftList,rightList}});
    }
  },[]);

  const handleNavClick=item=>{
    if(item.type==='link'){
      return window.open(item.link);
    }
    if(item.type==='language'){
      console.log(props);
      props.store.setState({'change-language':item.key});
    }
    if(item.type==='logout'){
      // message.success('logout！');
      // storage.rm('token');
      // props.router.push(item.path);
      // logout();
      return;
    }
    if(item.type==='theme'){
      switchTheme(item.key);
    }
    if(item.type==='collapse'){
      handleCollapse();
    }
    if(typeof item.handle==='function'){
      item.handle(item);
    }
    if(item.path){
      props.router.push(item.path);
    }
  };

  return <div className="header">
    <div className="header-wrap">
      <a className="banner" href="/">
        <div className="logo"><img src={logo} alt="logo" /></div>
        <div className="title">{title}</div>
      </a>
      <div className="nav">
        <div className="nav-wrap">
          <div className="nav-left">
            <NavList list={leftList} click={handleNavClick} collapsed={collapsed} />
          </div>
          {navMenu?.length?<HoriMenu menu={navMenu} />:null}
          <div className="nav-right">
            <NavList list={rightList} click={handleNavClick} />
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Index;


