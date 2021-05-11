import * as utils from '@huxy/utils';
import * as components from '@huxy/components';
import * as use from '@huxy/use';
import useRouter,{Link} from '@huxy/router';

export {useRouter,Link,utils,use,components};

window.useRouter=useRouter;
window.Link=Link;
window.utils=utils;
window.use=use;
window.components=components;


