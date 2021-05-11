import {useRef} from 'react';
import styles from './index.less';

const isValid=plugins=>plugins?.filter?.(item=>typeof item==='function');

const Panel=props=>{
  const panel=useRef();
  const {title,plugins,children,...rest}=props;
  const validPlugin=isValid(plugins);
  const isValidPlugin=validPlugin?.length;
  return <div className={styles.panel} ref={panel} {...rest}>
    {
      (title||isValidPlugin)&&<div className={styles['panel-header']}>
        {title&&<h4 className={styles['panel-title']}>{title}</h4>}
        {
          isValidPlugin&&<div className={styles['panel-plugins']}>
            {validPlugin.map((Item,i)=><a key={i}><Item panel={panel} /></a>)}
          </div>
        }
      </div>
    }
    <div className={styles['panel-body']}>
      {children}
    </div>
  </div>;
};

export default Panel;


