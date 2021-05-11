import {useState} from 'react';
import { Table, Tag, Space, Input, Button,Modal, Form,Tooltip,message,Checkbox,Select} from 'antd';
import { DeleteOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {roleList} from '@app/utils/config';
import {components,utils} from '@common';
import {listUserFn,deleteUserFn} from '@app/api/userApis';
import useFetchList from '@app/hooks/useFetchList';
import Panel from '@app/components/panel';

const {Row,Col}=components;

const {formatTime,validObj}=utils;

const getColumns = ({handleCheck,handleEdit,handleDelete}) => [
  {
    title: '用户名',
    dataIndex: 'name',
    render: (text,record) => <a onClick={()=>handleCheck(record)}>{text}</a>,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    render: text => text.replace(/\S+(@\S+)/,'*****$1'),
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align:'center',
    render:(text,record)=>{
      const disabled=false;
      return <>
        {/* <Button type="link" size="small" disabled={disabled} onClick={()=>handleCheck(record)}>设置权限</Button> */}
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleEdit(record)}>编辑</Button>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleDelete(record)} style={{color:disabled?'var(--lightColor)':'var(--red2)'}}>删除</Button>
      </>;
    },
  },
];

const Index=props=>{
  const [selectedRows,setSelectedRows]=useState([]);

  const [result,update]=useFetchList(listUserFn);

  const handleCheck=item=>{
    
  };
  const handleEdit=item=>{
    props.router.push({
      path:`./edit/${item._id}`,
      state:item,
    });
  };
  const handleAdd=async ()=>{
    props.router.push(`./add`);
  };
  const handleDelete=item=>{
    const items=item?[item]:selectedRows;
    const ids=items.map(v=>v._id);
    Modal.confirm({
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map(v=>v.name)}`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk:async ()=>{
        const {code,message:msg}=await deleteUserFn({ids});
        if(code===200){
          message.success(msg);
          setSelectedRows([]);
          update({current:1});
        }
      },
      onCancel(){
        console.log('Cancel');
      },
    });
  };

  const rowSelection={
    selectedRowKeys:selectedRows.map(v=>v._id),
    onChange:(selectedRowKeys,selectedRows)=>{
      setSelectedRows(selectedRows);
    },
    getCheckboxProps:record=>({
      disabled:false,
    }),
    columnWidth:'30px',
  };

  const actions={
    handleCheck,
    handleEdit,
    handleDelete,
  };

  const columns=getColumns(actions);

  const {isPending,data}=result;

  // const {total,current,size,list}=data||{};

  /* const pagination={
    onShowSizeChange:(current,size)=>pageChange(current,size),
    onChange:(current,size)=>pageChange(current,size),
    showSizeChanger:true,
    showQuickJumper:true,
    total:total||1,
    current:current||1,
    pageSize:size||10,
    pageSizeOptions:['10','20','30','40'],
  }; */

  return <div>
    <Row>
      <Col>
        <Panel>
          <div style={{float:'left'}}>
            <Space size="small">
              <Button loading={isPending} onClick={()=>handleAdd()} type="primary" icon={<PlusOutlined />}>新增</Button>
              <Button loading={isPending} disabled={!selectedRows.length} onClick={()=>handleDelete()} icon={<DeleteOutlined />}>批量删除</Button>
            </Space>
          </div>
          <div style={{float:'right'}}>
            <SearchForm /* submit={searchList} */ loading={isPending} />
          </div>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Table
            // pagination={pagination}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data??[]}
            loading={isPending}
            size="small"
            bordered
            rowKey="_id"
          />
        </Panel>
      </Col>
    </Row>
  </div>;
};

const SearchForm=props=>{
  const {submit,loading}=props;
  const [form]=Form.useForm();
  return <Form layout="inline" form={form} initialValues={{}} onFinish={value=>submit(validObj(value))}>
    <Form.Item name="name" label="用户名">
      <Input placeholder="请输入" allowClear style={{width:'120px'}} />
    </Form.Item>
    <Form.Item label="性别" name="sex">
      <Select placeholder="请选择" allowClear style={{width:'100px'}}>
        <Select.Option key="0" value="男">男</Select.Option>
        <Select.Option key="1" value="女">女</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">查询</Button>
      <Button style={{marginLeft:'12px'}} onClick={()=>form.resetFields()}>重置</Button>
    </Form.Item>
  </Form>;
};

export default Index;






