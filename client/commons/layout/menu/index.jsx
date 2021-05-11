import {useRef,useMemo} from 'react';
import {utils,use} from '@common';
import {render,renderCollapsed} from '../components/render';
import './index.less';
const {useClickAway,useUpdate}=use;
const {getSelected,uuidv4,cacheData}=utils;

const {getList,record}=cacheData();

const Index=props=>{
  const {menu,curPath,collapsed,handleCollapse,width}=props;
  useMemo(()=>record(curPath||'/'),[curPath]);
  const data=useMemo(()=>menu,[menu]);
  const menuRef=useRef();
  useClickAway(menuRef,e=>{
    if(width<1024&&collapsed){
      handleCollapse(false);
    }
  });
  const rerender=useUpdate();
  const toggle=(e,v)=>{
    e.stopPropagation();
    const selecteds=getSelected(data,v.path,'path');
    selecteds.map(item=>item.path===v.path?item.open=!item.open:item.uuid=uuidv4());
    rerender();
  };
  
  return <div className={`menu${collapsed?' collapsed':''}`} ref={menuRef}>
    <div className="menu-track">
      <ul className="tree-root">
        {width>1024&&collapsed?renderCollapsed(data,menuRef):render(data,toggle)}
      </ul>
    </div>
    <div className="menu-btbar">
      <h4 className="btbar-title">history list</h4>
      <ul className="btbar-list">
        {
          getList().reverse().map(({data},i)=><li key={`${data}-${i}`}><a href={data}>{data}</a></li>)
        }
      </ul>
    </div>
  </div>;
};

export default Index;


