import {useEffect,useRef,useState} from 'react';
import {Link} from '@common';
import Footer from '../footer';
import Menu from '../menu';
import './index.less';
// const getSecoudMenu=menu=>menu.find(v=>v.open)?.children??[];
export const breadcrumb=(current,bread)=><div className="breadcrumb">
  {/* <span style={{float:'left'}}>{bread}：</span> */}
  <ul>
    {current.filter(v=>v.name).map(v=><li key={v.path}><Link to={v.path}>{v.name}</Link></li>)}
  </ul>
</div>;

const time=450;
const Index=props=>{
  const {menu,current,children,collapsed,handleCollapse,store,width}=props;
  const curPath=current.slice(-1)[0]?.path;
  const i18ns=store.getState('i18ns')??{};
  const {main:{bread}}=i18ns;
  const hasMenu=menu?.length;
  const style=hasMenu?null:{paddingLeft:0};

  const [aniCls,setAniCls]=useState('');

  const pathRef=useRef(curPath);
  const timer=useRef();
  useEffect(()=>{
    const curPath=current.slice(-1)[0]?.path;
    if(curPath!==pathRef.current){
      pathRef.current=curPath;
      setAniCls(' ani-in');
      timer.current=setTimeout(()=>{
        setAniCls('');
      },time);
    }
    return ()=>clearTimeout(timer.current);
  },[current]);
  return <div className="frame-container">
    {
      hasMenu?<aside className="frame-aside">
        <Menu menu={menu} curPath={curPath} collapsed={collapsed} handleCollapse={handleCollapse} width={width} />
      </aside>:null
    }
    <div className="frame-view" style={style}>
      <div className="page-container">
        {breadcrumb(current||[],bread)}
        <div className={`content${aniCls}`}>
          {children}
        </div>
      </div>
      <footer className="frame-footer">
        <Footer />
      </footer>
    </div>
  </div>;
};

export default Index;



