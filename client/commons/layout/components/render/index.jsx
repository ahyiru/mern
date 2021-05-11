import {useEffect,useRef} from 'react';
import {Link} from '@common';
import fixIcons from '@app/utils/fixIcons';
const ulStyles={
  overflow:'hidden',
  maxHeight:'var(--ul-max-height)',
  transition:'max-height .3s',
};
const RenderChild=({item,children})=>{
  const {uuid,open}=item;
  const ul=useRef();
  const isInit=useRef(true);
  useEffect(()=>{
    const el=ul.current;
    if(isInit.current){
      const height=open?`${el.scrollHeight}px`:'0px';
      // el.style.transition='none';
      el.style.setProperty('--ul-max-height',height);
      isInit.current=false;
    }else{
      const initH=open?'0px':`${el.scrollHeight}px`;
      el.style.setProperty('--ul-max-height',initH);
      setTimeout(()=>{
        const height=open?`${el.scrollHeight}px`:'0px';
        // el.style.transition='';
        el.style.setProperty('--ul-max-height',height);
      },5);
    }
  },[open,item.children?.length]);
  useEffect(()=>{
    // 多层级触发
    if(uuid){
      const el=ul.current;
      el.style.setProperty('--ul-max-height','none');
    }
  },[uuid]);
  return <ul ref={ul} style={ulStyles}>{children}</ul>;
};

export const render=(data,toggle)=>data.map(item=>{
  const {name,path,icon,active,open,children}=item;
  const hasChildren=children?.length;
  const activeCls=active?'active':'';
  if(hasChildren){
    return <li key={name} onClick={e=>toggle(e,item)} has-children="true" className={open?'open':''}>
      <Link to={path} className={activeCls} preventDefault>
        {fixIcons(icon)}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <RenderChild item={item}>{render(children,toggle)}</RenderChild>
    </li>;
  }
  return <li key={name}>
    <Link to={path} stopPropagation className={activeCls}>
      {fixIcons(icon)}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});

export const renderCollapsed=(data,menuRef,level=0)=>data.map(item=>{
  const {name,path,icon,active,children}=item;
  const hasChildren=children?.length;
  const activeCls=active?'active':'';
  if(hasChildren){
    const mouseEvents=level?{}:{
      onMouseEnter:e=>menuRef.current.style.width='100vw',
      onMouseLeave:e=>setTimeout(()=>menuRef.current.style.width='',200),
    };
    return <li key={name} has-children="true" {...mouseEvents}>
      <Link to={path} className={activeCls} preventDefault>
        {fixIcons(icon)}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <ul>{renderCollapsed(children,menuRef,++level)}</ul>
    </li>;
  }
  return <li key={name}>
    <Link to={path} stopPropagation className={activeCls}>
      {fixIcons(icon)}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});

