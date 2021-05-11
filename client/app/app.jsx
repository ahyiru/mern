import {useEffect,useState} from 'react';
import {useRouter,components,utils} from '@common';
import configs from '@app/configs';
import getI18n from '@app/utils/getI18n';
import getRouters from '@app/utils/getRouters';

const {Spinner}=components;
const {storage,clone}=utils;

const ConfigProvider=({i18ns,language})=>{
  const {output,loading,store,updateRouter}=useRouter({...configs,routers:getRouters({i18ns}),title:i18ns.title});
  useEffect(()=>{
    if(store){
      const {subscribe,setState}=store;
      setState({i18ns,language});
      subscribe('change-language',async lang=>{
        storage.set('language',lang);
        const {i18ns,language}=await getI18n();
        setState({i18ns,language});
        updateRouter({routers:clone(getRouters({i18ns})),title:i18ns.title});
      });
    }
  },[store]);
  return <>
    {output}
    {loading&&<Spinner global />}
  </>;
};

const App=()=>{
  const [i18ns,setI18ns]=useState(null);
  useEffect(()=>{
    const loadI18n=async ()=>{
      const i18ns=await getI18n();
      setI18ns(i18ns);
    };
    loadI18n();
  },[]);
  if(!i18ns){
    return <Spinner global />;
  }
  return <ConfigProvider {...i18ns} />;
};

export default App;


