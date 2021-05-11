import {useEffect,useRef} from 'react';

import { Form, Input, Button, message,InputNumber,Select } from 'antd';

import {LeftOutlined} from '@ant-design/icons';

import Back from '@app/components/goBack';

import {addUserFn,editUserFn} from '@app/api/userApis';

import {components} from '@common';

import {layout,tailLayout} from '@app/utils/config';
import {nameRule,emailRule,passwordRule,roleRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

const {Row,Col}=components;

const formStyle={
  width:'50%',
};

const Index=props=>{
  const [form] = Form.useForm();
  const {getState}=props.history;
  const state=getState();
  const onFinish = async values => {
    const handler=state?editUserFn:addUserFn;
    values=state?{...state,...values}:values;
    try{
      const {code,message:msg}=await handler(values);
      if(code===200){
        message.success(msg);
        props.router.push(`/users`);
      }
    }catch(err){
      console.log(err);
    }
  };
  return <div>
    <Row>
      <Col>
        <Back />
      </Col>
      <Col>
        <Panel>
          <Form
            name="addUser"
            onFinish={onFinish}
            form={form}
            initialValues={state??{}}
            {...layout}
            style={formStyle}
          >
            <Form.Item label="用户名" name="name" rules={nameRule}>
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={emailRule}>
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={passwordRule}>
              <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item label="年龄" name="age">
              <InputNumber placeholder="年龄" style={{width:'100px'}}/>
            </Form.Item>
            <Form.Item label="性别" name="sex">
              <Select placeholder="请选择" allowClear style={{width:'100px'}}>
                <Select.Option key="0" value="男">男</Select.Option>
                <Select.Option key="1" value="女">女</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button style={{marginLeft:'12px'}} onClick={()=>form.resetFields()}>重置</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Col>
    </Row>
  </div>;
};

export default Index;

















