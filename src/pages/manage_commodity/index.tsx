import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';
import { Form, Button, Input, Select, Table, Tag, Modal, Checkbox, Upload, message, Popover, Row, Col  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const ManageCommodity = () => {
  const page = 'manage_commodity';

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [range, setRange] = useState('');
  const [brand, setBrand] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(true);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [visiblemodify, setVisiblemodify] = useState(false);
  const [newordertime, setNewordertime] = useState('');

const accountcolumnsDetail = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '项目收费',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '支出采样费',
    dataIndex: 'name',
    key: 'name',
  },
]
  const AddcolumnsDetail = [
    {
      title: '操作时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作来源',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作备注',
      dataIndex: 'name',
      key: 'name',
    },
  ]
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '项目名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '订单金额',
      dataIndex: 'address',
      key: 'address',
      // render: text => <a>{text}</a>,
    },
    {
      title: '实付金额',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '预约人信息',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '采样点信息',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '下单时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '订单状态',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '预约时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '报告状态',
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
          }}>查看订单</a>
          <Popover
            content={<a>Close</a>}
            title="111"
            trigger="click"
            visible={false}
            onVisibleChange={(visible) => { }}
          >
            <a style={{ padding: '0 5px' }} onClick={() => { }}>取消订单</a>
          </Popover>
          <a style={{ padding: '0 5px' }} onClick={() => setVisiblemodify(true)}>修改预约时间</a>
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
  const handleOk = () => {
    setVisibleAdd(false)
  };

  const handleCancel = () => {
    setVisibleAdd(false)
  };
  const handleSelectOk = () => {
    console.log('newtime', newordertime)
    setVisiblemodify(false)
  }
  const handleSelectCancel = () => {
    setVisiblemodify(false)
  }
  return (
    <PageHeaderWrapper className={styles.main}>
      {/* <PageBasic page={page} hasSearchForm={false} /> */}
      <Form layout="inline" style={{ paddingBottom: '30px' }}>
        <Form.Item label="订单编号">
          <Input placeholder="请输入订单编号" onChange={(e) => { setName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="项目名称">
          <Input placeholder="请输入项目名称" onChange={(e) => { setCode(e.target.value) }} />
        </Form.Item>
        <Form.Item label="预约手机号">
          <Input placeholder="请输入预约手机号" onChange={(e) => { setCode(e.target.value) }} />
        </Form.Item>
        <Form.Item label="订单状态">
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
      <Table columns={columns} dataSource={data} />
      {/* 修改预约时间 */}
      <Modal
        title="修改预约时间"
        visible={visiblemodify}
        onOk={handleSelectOk}
        onCancel={handleSelectCancel}
        width={600}
        maskClosable={false}
      >
        <Form {...layout}>
          <Form.Item label="新的预约时间">
            <Select style={{ width: '200px' }} onChange={(value) => { setNewordertime(value) }}>
              <Select.Option value="demo">2019</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 订单详情 */}
      <Modal
        title="订单详情"
        visible={visibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        maskClosable={false}
        footer={null}
      >
        <div className={styles.serviceManageWrap}>
          <div className={styles.titleWrap}>
            <div className={styles.titlestatus}>待预约</div>
            <div>有效期至2010-12-01</div>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title}>基本信息</div>
            <Row className={styles.row}>
              <Col span={12}>订单编号：111111</Col>
              <Col span={12}>预约采样时间：1111111</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={12}>支付方式：111111</Col>
              <Col span={12}>订单来源：1111111</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title}>预约人信息</div>
            <Row className={styles.row}>
              <Col span={12}>姓名：111111</Col>
              <Col span={12}>性别：1111111</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={12}>年龄：111111</Col>
              <Col span={12}>手机号码：1111111</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title}>采样点信息</div>
            <Row className={styles.row}>
              <Col span={12}>采样点名称：111111</Col>
              <Col span={12}>所在区域：1111111</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={12}>详细地址：111111</Col>
              <Col span={12}>联系人：1111111</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title} style={{paddingBottom:'20px'}}>项目信息</div>
            <Table columns={accountcolumnsDetail} dataSource={data} pagination={false} bordered />
            <div className={styles.title} style={{paddingTop:'20px'}}>费用信息</div>
            <Row className={styles.row}>
              <Col span={8}>项目合计：111111</Col>
              <Col span={8}>实付金额：1111111</Col>
              <Col span={8}>采样费：1111111</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title} style={{marginBottom:'20px'}}>操作信息</div>
            <Table columns={AddcolumnsDetail} dataSource={data} pagination={false} bordered/>
          </div>
        </div>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageCommodity);
