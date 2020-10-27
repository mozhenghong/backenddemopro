import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';
import { Form, Button, Input, Select, Table, Tag, Modal, Checkbox, Upload, message, Popover, Calendar } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'


const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span:10},
};

const ManageWorks = () => {
  const page = 'manage_works';

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [range, setRange] = useState('');
  const [brand, setBrand] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [visiblemanage, setVisiblemanage] = useState(false);
  const [datearr, setDatearr] = useState([]);





  const Addcolumns = [
    {
      title: '诊所编码',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所在区域',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '诊所名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '经纬度',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '详细地址',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  const Selectcolumns = [
    {
      title: '项目编码',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格区域',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '项目简称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '套餐类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '基准价',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '品牌',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '品牌项目名',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '采样提成',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            console.log('record==>', record)
          }}>选择</a>
        </div>
      ),
    },
  ]
  const Managecolumns = [
    {
      title: '项目编码',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格区域',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '项目简称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '套餐类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '基准价',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '品牌',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '品牌项目名',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '采样提成',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            console.log('record==>', record)
          }}>删除</a>
        </div>
      ),
    },
  ]
  const AddcolumnsDetail = [
    {
      title: '项目编码',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '子项名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '子项检测意义',
      dataIndex: 'age',
      key: 'age',
    },
  ]
  const columns = [
    {
      title: '诊所编码',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '诊所名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '采样点名称',
      dataIndex: 'address',
      key: 'address',
      render: text => <a>{text}</a>,
    },
    {
      title: '医院等级',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '区域',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '详细地址',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '负责人',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '联系电话',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '添加时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '状态',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            console.log('record==>', record)
            setVisibleAdd(true)
          }}>编辑</a>
          <Popover
            content={<a>Close</a>}
            title="111"
            trigger="click"
            visible={false}
            onVisibleChange={(visible) => { }}
          >
            <a style={{ padding: '0 5px' }} onClick={() => { }}>批量下架</a>
          </Popover>
          <a style={{ padding: '0 5px' }} onClick={() => setVisiblemanage(true)}>采样项目管理</a>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const onReset = () => {

  }
  const handleSubmit = () => {
    console.log('111', name, code, range, brand)
  }
  const handleAdd = () => {
    setVisibleAdd(true)
  }
  const handleOk = () => {
    setVisibleAdd(false)
  };

  const handleCancel = () => {
    setVisibleAdd(false)
  };
  const handleSelectOk = () => {
    setVisibleSelect(false)
  };

  const handleSelectCancel = () => {
    setVisibleSelect(false)
  };
  const handleManageOk = () => {
    setVisiblemanage(false)
  }
  const handleManageCancel = () => {
    setVisiblemanage(false)
  }
  const onChange = (date, e) => {
    const dateString = moment(date).format('YYYY-MM-DD');
    let arr = datearr
    if (e.target.checked) {
      arr.push(dateString);
    } else {
      const deleteIndex = arr.findIndex(item => item === dateString);
      arr.splice(deleteIndex, 1);
    }
    setDatearr(arr)
    console.log('e -> ', arr);
  }

  const dateCellRender = (value) => {
    return (
      <Checkbox onChange={onChange.bind(null, value)} />
    );
  }
  return (
    <PageHeaderWrapper className={styles.main}>
      {/* <PageBasic page={page} /> */}
      <Form layout="inline">
        <Form.Item label="采样点名称">
          <Input placeholder="请输入采样点名称" onChange={(e) => { setName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="诊所编码">
          <Input placeholder="请输入诊所编码" onChange={(e) => { setCode(e.target.value) }} />
        </Form.Item>
        <Form.Item label="诊所名称">
          <Input placeholder="请输入诊所名称" onChange={(e) => { setCode(e.target.value) }} />
        </Form.Item>
        <Form.Item label="区域">
          <Select style={{ width: '200px' }} onChange={(value) => { setRange(value) }}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={onReset} style={{ marginRight: '20px' }}>重置</Button>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.addbutton}>
        <Button onClick={handleAdd} style={{ marginRight: '20px' }} type="primary" >新增采样点</Button>
      </div>
      <Table columns={columns} dataSource={data} />
      {/* 新增弹窗 */}
      <Modal
        title="新增采样点"
        visible={visibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        maskClosable={false}
      >
        <Form layout="inline">
          <Form.Item label="诊所编码">
            <Input placeholder="请输入诊所编码" onChange={(e) => { setCode(e.target.value) }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              查询
          </Button>
            <Button onClick={handleSubmit} style={{ marginLeft: '20px' }}>
              重置
          </Button>
          </Form.Item>
        </Form>
        <div className={styles.addTitle}>基础信息</div>
        <Table columns={Addcolumns} dataSource={data} pagination={false} />
        <Form {...layout} name="nest-messages" style={{ paddingTop: '20px' }}>
          <Form.Item label="负责人" >
            <Input />
          </Form.Item>
          <Form.Item label="联系电话" >
            <Input />
          </Form.Item>
        </Form>
        <div className={styles.addTitle}>补充信息</div>
        <Form {...layout} name="nest-messages" style={{ paddingTop: '20px' }}>
          <Form.Item label="采样点名称" >
            <Input />
          </Form.Item>
          </Form>
            <div className={styles.sitecalendardemocardwrap}>
              <div>可预约时间：</div>
              <div className={styles.sitecalendardemocard}>
                <Calendar  fullscreen={true} dateCellRender={dateCellRender}  style={{width:'600px'}}/>
              </div>
            </div>
          <Form {...layout}>
          <Form.Item label="每日可预约人次">
            <Input />
          </Form.Item>
          <Form.Item label="简介">
            <TextArea />
          </Form.Item>
          <Form.Item label="体检须知">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      {/* 采样项目管理弹窗 */}
      <Modal
        title="采样项目管理"
        visible={visiblemanage}
        onOk={handleManageOk}
        onCancel={handleManageCancel}
        width={1200}
        maskClosable={false}
      >
        <Button type="primary" onClick={() => {
          setVisiblemanage(false)
          setVisibleSelect(true)
        }}>+添加项目</Button>
        <Table columns={Managecolumns} dataSource={data} />
      </Modal>
      {/* 选择项目弹窗 */}
      <Modal
        title="添加项目"
        visible={visibleSelect}
        onOk={handleSelectOk}
        onCancel={handleSelectCancel}
        width={1200}
        maskClosable={false}
        footer={null}
      >
        <Form layout="inline">
          <Form.Item label="项目编码">
            <Input placeholder="请输入项目编码" onChange={(e) => { setCode(e.target.value) }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              查询
          </Button>
          </Form.Item>
        </Form>
        <Table columns={Selectcolumns} dataSource={data} />
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageWorks);
