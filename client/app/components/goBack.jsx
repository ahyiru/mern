import {Button} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import Panel from '@app/components/panel';

const Index=props=><Panel>
  <Button onClick={e=>history.back()} type="link" size="small" icon={<LeftOutlined />}>返回</Button>
</Panel>;

export default Index;

