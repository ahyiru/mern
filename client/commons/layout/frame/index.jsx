import Layout from './layout';

import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import jaJP from 'antd/es/locale/ja_JP';

const antLang={
  zh:zhCN,
  en:enUS,
  jp:jaJP,
};

const Index=props=>{
  const menu=props.store.getState('appMenu');
  const language=props.store.getState('language');
  const i18ns=props.store.getState('i18ns');
  return <ConfigProvider locale={antLang[language]||zhCN}>
    <Layout {...props} menu={menu} i18ns={i18ns} />
  </ConfigProvider>;
};

export default Index;
