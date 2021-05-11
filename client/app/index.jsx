import ReactDOM from 'react-dom';

import App from './app';

import '@common/styles/global.less';

const mountNode=document.getElementById('app');

ReactDOM.render(<App />,mountNode);
