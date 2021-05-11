import {utils} from '@common';
const {traverItem}=utils;

import staticRouters from './staticRouter';
import dynamicRouter from './dynamicRouter';

staticRouters[0].children=dynamicRouter;

const routers=nameList=>traverItem(v=>{
  v.name=nameList[v.path]||v.name;
})(staticRouters);

export default routers;





