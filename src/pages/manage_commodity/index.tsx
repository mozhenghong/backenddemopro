import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Form, Button, Input, Select, Table, Tag, Modal, Checkbox, Upload, message, Popover, Row, Col  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getServiceOrderList, getServiceOrderDetail} from '@/services/alipay';


const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const ManageCommodity = () => {
  //列表相关
  const [orderNo, setOrderNo] = useState('');
  const [itemName, setItemName] = useState('');
  const [mobile, setMobile] = useState('');
  const [orderStatus, setOrderStatus] = useState(3);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageTotal, setPageTotal] = useState(40);
  const [cancelId, setCancelId] = useState('');
  const [detailId, setDetailId] = useState('');

  //详情相关
  const [detailData, setDetailData] = useState({});

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visiblemodify, setVisiblemodify] = useState(false);
  const [newordertime, setNewordertime] = useState('');
  
  const getServiceOrderListMethod = () => {
    getServiceOrderList({order_no:orderNo, item_name:itemName, mobile:mobile,order_status:orderStatus,'page_index': pageIndex, 'page_size': pageSize}).then((res) => {
     
    })
  }
  const getServiceOrderDetailMethod = (data) => {
    getServiceOrderDetail(data).then((res) => {
      // setDetailData(res.data)
    })
  }
  useEffect(() => {
    getServiceOrderListMethod()
  }, []);
const accountcolumnsDetail = [
  {
    title: '项目名称',
    dataIndex: 'item_name',
    key: 'item_name',
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
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: '项目名称',
      dataIndex: 'package_name',
      key: 'package_name',
    },
    {
      title: '订单金额',
      dataIndex: 'pay_price',
      key: 'pay_price',
      // render: text => <a>{text}</a>,
    },
    {
      title: '实付金额',
      dataIndex: 'pay_price',
      key: 'pay_price',
    },
    {
      title: '预约人信息',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
       return (<div>
          <div>{record.name}</div>
          <div>{record.phone}</div>
       </div>)
      }
    },
    {
      title: '采样点信息',
      dataIndex: 'merchant_name',
      key: 'merchant_name',
      render: (text, record) => {
        return (<div>
           <div>{record.merchant_area_code}{record.merchant_name}</div>
           <div>{record.merchant_province_name}{record.merchant_city_name}{record.merchant_area_name}{record.merchant_address}</div>
        </div>)
       }
    },
    {
      title: '下单时间',
      dataIndex: 'create_date',
      key: 'create_date',
    },
    {
      title: '订单状态',
      dataIndex: 'order_status',
      key: 'order_status',
      render: (text, record) => {
        if(record.order_status===3){
          return <span>未预约</span>
        }else if(record.order_status===4){
          return <span>已预约</span>
        }else if(record.order_status===5){
          return <span>已到检</span>
        }else if(record.order_status===6){
          return <span>退款</span>
        }
      }
    },
    {
      title: '预约时间',
      dataIndex: 'reserve_date',
      key: 'reserve_date',
    },
    {
      title: '报告状态',
      dataIndex: 'hava_report',
      key: 'hava_report',
      render: (text, record) => {
        if(record.hava_report===0){
          return <span>没报告</span>
        }else if(record.hava_report===1){
          return <span>有报告</span>
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            setDetailId(record.order_id)
            setVisibleAdd(true)
            getServiceOrderDetailMethod({order_id: record.order_id})
          }}>查看订单</a>
            <a style={{ padding: '0 5px' }} onClick={() => {setCancelId(record.order_id) ; setVisibleCancel(true)}}>取消订单</a>
          <a style={{ padding: '0 5px' }} onClick={() => setVisiblemodify(true)}>修改预约时间</a>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      order_id: '45555',
      phone: 32,
      address: 'New York No. 1 Lake Park',
      hava_report:0,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      hava_report:1,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const onShowSizeChange = (current, pageSize) => {
    setPageIndex(current)
    setPageSize(pageSize)
  }
  const pageChange = (current, pageSize) => {
    setPageIndex(current)
    setPageSize(pageSize)
  }
  const onReset = () => {
    setOrderNo('')
    setItemName('')
    setMobile('')
    setOrderStatus(undefined)
    setPageIndex(1)
    setPageSize(20)
    getServiceOrderList({order_no:'', item_name:'', mobile:'',order_status:null,'page_index': 1, 'page_size': 20}).then((res) => {
     
    })
  }
  const handleCancelOrder = () => {
    setVisibleCancel(false)
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
          <Input placeholder="请输入订单编号" value={orderNo} onChange={(e) => { setOrderNo(e.target.value) }} />
        </Form.Item>
        <Form.Item label="项目名称">
          <Input placeholder="请输入项目名称" value={itemName} onChange={(e) => { setItemName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="预约手机号">
          <Input placeholder="请输入预约手机号" value={mobile}  onChange={(e) => { setMobile(e.target.value) }} />
        </Form.Item>
        <Form.Item label="订单状态">
          <Select style={{ width: '200px' }} value={orderStatus} onChange={(value) => { setOrderStatus(value) }}>
            <Select.Option value={3}>未预约</Select.Option>
            <Select.Option value={4}>已预约</Select.Option>
            <Select.Option value={5}>已到检</Select.Option>
            <Select.Option value={6}>退款</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={onReset} style={{ marginRight: '20px' }}>重置</Button>
          <Button type="primary" htmlType="submit" onClick={()=> {getServiceOrderListMethod()}}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} 
       pagination={{
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
        pageSize: pageSize,
        current: pageIndex,
        total: pageTotal,
        onChange: pageChange
      }}
      />
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
              <Col span={12}>订单编号：{detailData.order_id}</Col>
              <Col span={12}>预约采样时间：{detailData.reserve_date}</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={12}>支付方式：{detailData.name}</Col>
              <Col span={12}>订单来源：{detailData.name}</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title}>预约人信息</div>
            <Row className={styles.row}>
              <Col span={12}>姓名：{detailData.name}</Col>
              {detailData.gender===0&&<Col span={12}>性别：男</Col>}
              {detailData.gender===1&&<Col span={12}>性别：女</Col>}
            </Row>
            <Row className={styles.row}>
              <Col span={12}>年龄：{detailData.age}</Col>
              <Col span={12}>手机号码：{detailData.phone}</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title}>采样点信息</div>
            <Row className={styles.row}>
              <Col span={12}>采样点名称：{detailData.merchant_name}</Col>
              <Col span={12}>所在区域：{detailData.merchant_province_name} {detailData.merchant_city_name} {detailData.merchant_area_name}</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={12}>详细地址：{detailData.merchant_address}</Col>
              <Col span={12}>联系人：{detailData.merchant_link_man_name} {detailData.merchant_link_man_mobile}</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title} style={{paddingBottom:'20px'}}>项目信息</div>
            <Table columns={accountcolumnsDetail} dataSource={[]} pagination={false} bordered />
            <div className={styles.title} style={{paddingTop:'20px'}}>费用信息</div>
            <Row className={styles.row}>
              <Col span={8}>项目合计：{detailData.settlement_price}</Col>
              <Col span={8}>实付金额：{detailData.pay_price}</Col>
              <Col span={8}>采样费：{detailData.sampling_price}</Col>
            </Row>
          </div>
          <div className={styles.detailWrap}>
            <div className={styles.title} style={{marginBottom:'20px'}}>操作信息</div>
            <Table columns={AddcolumnsDetail} dataSource={data} pagination={false} bordered/>
          </div>
        </div>
      </Modal>

      {/* 取消订单 */}
      <Modal
        title="取消订单"
        visible={visibleCancel}
        onOk={handleCancelOrder}
        onCancel={()=> {setVisibleCancel(false)}}
        width={400}
        maskClosable={false}
      >
        <div>是否取消订单？</div>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageCommodity);
