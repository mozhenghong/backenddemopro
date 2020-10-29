import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';
import { Form, Button, Input, Select, Table, Tag, Modal, Checkbox, Upload, message, Popover, Calendar, Cascader , Descriptions} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import areaList from '../../components/area'
import {getsamplingPointList, getArea, downShelf, getMerchant, addMerchant, updateMerchant, getMerchantExamination, deleteMerchant, getAddMerchantExamination, AddMerchantExamination} from '@/services/alipay';



const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span:10},
};

const ManageWorks = () => {
  //采样点列表相关
  const [columnsData, setColumnsData] = useState([]);
  const [name, setName] = useState(null);
  const [account, setAccount] = useState(null);
  const [merchantName, setMerchantName] = useState(null);
  const [area, setArea] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageTotal, setPageTotal] = useState(20);
  //下架
  const [visibleLowershelf, setVisibleLowershelf] = useState(false);
  const [lowershelfId, setLowershelfId] = useState('');

//新增
const [detailId, setDetailId] = useState('');
const [detailAccount, setDetailAccount] = useState('');
const [merchantRecord, setMerchantRecord] = useState({});
const [contractName, setContractName] = useState('');
const [contractPhone, setContractPhone] = useState('');
const [merchantAddName, setMerchantAddName] = useState('');
const [reserveTimeList, setReserveTimeList] = useState([]);
const [stock, setStock] = useState('');
const [introduction, setIntroduction] = useState('');
const [instruction, setInstruction] = useState('');

//采样点项目管理
const [merchantExaminationColumns, setMerchantExaminationColumns] = useState([]);
const [pageIndexManage, setPageIndexManage] = useState(1);
const [pageSizeManage, setPageSizeManage] = useState(20);
const [pageTotalManage, setPageTotalManage] = useState(20);
const [manageAccount, setManageAccount] = useState('');
const [pageIndexManageAdd, setPageIndexManageAdd] = useState(1);
const [pageSizeManageAdd, setPageSizeManageAdd] = useState(20);
const [pageTotalManageAdd, setPageTotalManageAdd] = useState(40);
const [projectCode, setProjectCode] = useState('');
const [addMerchantExaminationColumns, setAddMerchantExaminationColumns] = useState([]);





const [code, setCode] = useState('');
const [range, setRange] = useState('');
const [brand, setBrand] = useState('');
const [visibleAdd, setVisibleAdd] = useState(false);
const [visibleSelect, setVisibleSelect] = useState(false);
const [visiblemanage, setVisiblemanage] = useState(false);
const [isAdd, setIsAdd] = useState(true);

//查询新增项目列表
const getAddMerchantExaminationMethod = (data) => {
  getAddMerchantExamination(data).then((res) => {
    if(res&&res.code===0){
      setAddMerchantExaminationColumns(res.data.examination_package_list)
      setPageTotalManageAdd(res.data.total)
    }
  })
}

//查询采样点项目
const getMerchantExaminationMethod = (data) => {
  getMerchantExamination(data).then((res) => {
    if(res&&res.code===0){
      setMerchantExaminationColumns(res.data.examination_package_list)
      setPageTotalManage(res.data.total)
    }
  })
}
//删除采样点项目
const deleteMerchantMethod = (data) => {
  deleteMerchant(data).then((res) => {
    if(res&&res.code===0){
      message.success('删除成功！')
    }
  })
}
//新增采样点项目
const AddMerchantExaminationMethod = (data) => {
  AddMerchantExamination(data).then((res) => {
    if(res&&res.code===0){
      setVisibleSelect(false)
      setVisiblemanage(true)
      getMerchantExaminationMethod({account:manageAccount, page_index:pageIndexManage, page_size: pageSizeManage })
    }
  })
}
//新增采样点
const addMerchantMethod = () => {
  addMerchant({account:detailAccount, contract_name:contractName, contract_phone: contractPhone, instruction,introduction, name:merchantAddName, reserve_time_list:reserveTimeList, stock }).then((res) => {
    if(res&&res.code===0){
      message.success('操作成功')
      getsamplingPointListMethod()
    }
  })
}
//更新采样点
const updateMerchantMethod = () => {
  updateMerchant({id:detailId, account:detailAccount, contract_name:contractName, contract_phone: contractPhone, instruction,introduction, name:merchantAddName, reserve_time_list:reserveTimeList, stock }).then((res) => {
    if(res&&res.code===0){
      message.success('操作成功')
      getsamplingPointListMethod()
    }
  })
}
//获取采样点列表
const getsamplingPointListMethod = () => {
  getsamplingPointList({name:name, account:account, merchant_name:merchantName, province_code: area[0]||null, city_code:area[1]||null, district_code:area[2]||null,page_index: pageIndex, page_size: pageSize }).then((res) => {
    if(res&&res.code===0){
      setColumnsData(res.data.merchant_examination_list)
      setPageTotal(res.data.total)
    }
  })
}
//获取诊所详情
const getMerchantMethod = (data) => {
  getMerchant(data).then((res) => {
    if(res&&res.code===0){
      setMerchantRecord(res.data)
      setDetailId(res.id)
      setDetailAccount(res.data.account)
      setContractName(res.data.contract_name)
      setContractPhone(res.data.contract_phone)
      setMerchantAddName(res.data.name)
      setReserveTimeList(res.data.reserve_time_list||[])
      setStock(res.data.stock)
      setIntroduction(res.data.introduction)
      setInstruction(res.data.instruction)
    }
  })
}

useEffect(() => {
  getArea().then((res) => {
    // setAreaOptions(res.data)
  })
  getsamplingPointListMethod()
}, []);

  const Selectcolumns = [
    {
      title: '项目编码',
      dataIndex: 'project_code',
      key: 'project_code',
    },
    {
      title: '价格区域',
      dataIndex: 'price_area_name',
      key: 'price_area_name',
    },
    {
      title: '商品名称',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (text, record) => {
        if (record.gender === 0) {
          return <span>男</span>
        } else if (record.gender === 1) {
          return <span>女</span>
        } else if (record.gender === 2) {
          return <span>通用</span>
        }
      },
    }, {
      title: '套餐类型',
      dataIndex: 'labels',
      key: 'labels',
    },
    {
      title: '基准价',
      dataIndex: 'benchmark_price',
      key: 'benchmark_price',
    },
    {
      title: '品牌',
      dataIndex: 'brand_name',
      key: 'brand_name',
    },
    {
      title: '品牌项目名',
      dataIndex: 'brand_project_name',
      key: 'brand_project_name',
    },
    {
      title: '采样提成',
      dataIndex: 'sampling_price',
      key: 'sampling_price',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            AddMerchantExaminationMethod({account:manageAccount, examination_package_id:record.examination_package_id})
          }}>选择</a>
        </div>
      ),
    },
  ]
  const Managecolumns = [
    {
      title: '项目编码',
      dataIndex: 'package_code',
      key: 'package_code',
    },
    {
      title: '价格区域',
      dataIndex: 'price_area_id',
      key: 'price_area_id',
    },
    {
      title: '商品名称',
      dataIndex: 'package_name',
      key: 'package_name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (text, record) => {
        if (record.gender === 0) {
          return <span>男</span>
        } else if (record.gender === 1) {
          return <span>女</span>
        } else if (record.gender === 2) {
          return <span>通用</span>
        }
      },
    }, {
      title: '套餐类型',
      dataIndex: 'package_type',
      key: 'package_type',
    },
    {
      title: '品牌',
      dataIndex: 'brand_name',
      key: 'brand_name',
    },
    {
      title: '品牌项目名',
      dataIndex: 'brand_project_name',
      key: 'brand_project_name',
    },
    {
      title: '采样提成',
      dataIndex: 'sampling_price',
      key: 'sampling_price',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
           deleteMerchantMethod({id: record.id, account:manageAccount, examination_package_id: record.examination_package_id})
           getMerchantExaminationMethod({account:manageAccount, page_index:pageIndexManage, page_size: pageSizeManage })
          }}>删除</a>
        </div>
      ),
    },
  ]

  const columns = [
    {
      title: '诊所编码',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '诊所名称',
      dataIndex: 'merchant_name',
      key: 'merchant_name',
    },
    {
      title: '采样点名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '医院等级',
      dataIndex: 'level_name',
      key: 'level_name',
    },
    {
      title: '区域',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '负责人',
      dataIndex: 'contract_name',
      key: 'contract_name',
    },
    {
      title: '联系电话',
      dataIndex: 'contract_phone',
      key: 'contract_phone',
    },
    {
      title: '添加时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
    },
    {
      title: '状态',
      dataIndex: 'status_name',
      key: 'status_name',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            setVisibleAdd(true)
            setIsAdd(false)
            setDetailAccount(record.account)
            // setDetailId(record.id)
            getMerchantMethod({account:record.account})
          }}>编辑</a>
            <a style={{ padding: '0 5px' }} onClick={() => { setVisibleLowershelf(true) ; setLowershelfId(record.account)}}>批量下架</a>
          <a style={{ padding: '0 5px' }} onClick={() => {
            setVisiblemanage(true); 
            setManageAccount(record.account)
            getMerchantExaminationMethod({account:record.account, page_index:pageIndexManage, page_size: pageSizeManage })}}>采样项目管理</a>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      account:111,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      id: 444
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
    setName(null)
    setAccount(null)
    setMerchantName(null)
    setArea([])
    setPageIndex(1)
    setPageSize(20)
    getsamplingPointList({name: null, account: null, merchant_name:null, province_code: null, city_code:null, district_code:null,page_index: 1, page_size: 20 }).then((res) => {
      if(res.code===0){
        setColumnsData(res.data.merchant_examination_list)
        setPageTotal(res.data.total)
      }
    })
  }
  const handleAdd = () => {
    setVisibleAdd(true)
  }
  const handleOk = () => {
    if(isAdd){
      addMerchantMethod()
    }else{
      updateMerchantMethod()
    }
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
  const onShowSizeChange = (current, pageSize) => {
    setPageIndex(current)
    setPageSize(pageSize)
  }
  const pageChange = (current, pageSize) => {
    setPageIndex(current)
    setPageSize(pageSize)
  }
  const onShowSizeChangeManage = (current, pageSize) => {
    setPageIndexManage(current)
    setPageSizeManage(pageSize)
  }
  const pageChangeManage = (current, pageSize) => {
    setPageIndexManage(current)
    setPageSizeManage(pageSize)
  }
  const onShowSizeChangeManageAdd = (current, pageSize) => {
    setPageIndexManageAdd(current)
    setPageSizeManageAdd(pageSize)
  }
  const pageChangeManageAdd = (current, pageSize) => {
    setPageIndexManageAdd(current)
    setPageSizeManageAdd(pageSize)
  }
  const LowershelfOk = () => {
    downShelf({ 'account': lowershelfId }).then((res) => {
      if(res&&res.code===0){
        message.success('操作成功！')
        setVisibleLowershelf(false)
        getsamplingPointListMethod()
      }
    })
  }
  
  const onChange = (date, e) => {
    // const dateString = moment(date).format('YYYY-MM-DD');
    const dateString = moment(moment(date).format('YYYY-MM-DD')).valueOf()
    let arr = reserveTimeList
    if (e.target.checked) {
      arr.push(dateString);
    } else {
      const deleteIndex = arr.findIndex(item => item === dateString);
      arr.splice(deleteIndex, 1);
    }
    setReserveTimeList(arr)
  }

  const dateCellRender = (value) => {
    // console.log('value==>',moment(value).valueOf())
    // return (
    //     <Checkbox onChange={onChange.bind(null, value)} />
    //   );
    if(reserveTimeList.indexOf(moment(moment(value).format('YYYY-MM-DD')).valueOf())>-1){
      return (
        <Checkbox checked={true} onChange={onChange.bind(null, value)} />
      );
    }else{
      return (
        <Checkbox checked={false} onChange={onChange.bind(null, value)} />
      );
    }
    
  }
  return (
    <PageHeaderWrapper className={styles.main}>
      {/* <PageBasic page={page} /> */}
      <Form layout="inline">
        <Form.Item label="采样点名称">
          <Input placeholder="请输入采样点名称" value={name} onChange={(e) => { setName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="诊所编码">
          <Input placeholder="请输入诊所编码" value={account} onChange={(e) => { setAccount(e.target.value) }} />
        </Form.Item>
        <Form.Item label="诊所名称">
          <Input placeholder="请输入诊所名称" value={merchantName} onChange={(e) => {setMerchantName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="区域">
          <Cascader options={areaList} onChange={(value)=> {setArea(value);}} value={area} placeholder="请选择区域" changeOnSelect />,
        </Form.Item>
        <Form.Item>
          <Button onClick={onReset} style={{ marginRight: '20px' }}>重置</Button>
          <Button type="primary" htmlType="submit" onClick={()=> {getsamplingPointListMethod()}}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.addbutton}>
        <Button onClick={handleAdd} style={{ marginRight: '20px' }} type="primary" >新增采样点</Button>
      </div>
      <Table columns={columns} dataSource={columnsData} 
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
          pageSize: pageSize,
          current: pageIndex,
          total: pageTotal,
          onChange: pageChange
        }
        }
      />
      {/* 新增弹窗 */}
      <Modal
        title={isAdd?"新增采样点":"编辑采样点"}
        visible={visibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        maskClosable={false}
      >
        <Form layout="inline">
          <Form.Item label="诊所编码">
            <Input placeholder="请输入诊所编码" value={detailAccount} onChange={(e) => { setDetailAccount(e.target.value) }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={()=> {getMerchantMethod({account: detailAccount})}}>
              查询
          </Button>
            <Button onClick={()=>{getMerchantMethod({account: ''})}} style={{ marginLeft: '20px' }}>
              重置
          </Button>
          </Form.Item>
        </Form>
        <div className={styles.addTitle}>基础信息</div>
        <Descriptions title="" layout="vertical" bordered column={5}>
          <Descriptions.Item label="诊所编码">{merchantRecord.account&&merchantRecord.account}</Descriptions.Item>
          <Descriptions.Item label="所在区域">{merchantRecord.area&&merchantRecord.area}</Descriptions.Item>
          <Descriptions.Item label="诊所名称">{merchantRecord.merchant_name&&merchantRecord.merchant_name}</Descriptions.Item>
          <Descriptions.Item label="经纬度"><div>{merchantRecord.longitude&&merchantRecord.longitude}</div><div>{merchantRecord.latitude&&merchantRecord.latitude}</div></Descriptions.Item>
          <Descriptions.Item label="详细地址">{merchantRecord.address&&merchantRecord.address}</Descriptions.Item>
        </Descriptions>
        <Form {...layout} name="nest-messages" style={{ paddingTop: '20px' }}>
          <Form.Item label="负责人" >
            <Input value={contractName} onChange={(e) => { setContractName(e.target.value) }}/>
          </Form.Item>
          <Form.Item label="联系电话" >
            <Input value={contractPhone} onChange={(e) => { setContractPhone(e.target.value) }}/>
          </Form.Item>
        </Form>
        <div className={styles.addTitle}>补充信息</div>
        <Form {...layout} name="nest-messages" style={{ paddingTop: '20px' }}>
          <Form.Item label="采样点名称" >
            <Input value={merchantAddName} onChange={(e) => { setMerchantAddName(e.target.value) }}/>
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
            <Input value={stock} onChange={(e) => { setStock(e.target.value) }}/>
          </Form.Item>
          <Form.Item label="简介">
            <TextArea value={introduction} onChange={(e) => { setIntroduction(e.target.value) }}/>
          </Form.Item>
          <Form.Item label="体检须知">
            <TextArea value={instruction} onChange={(e) => { setInstruction(e.target.value) }}/>
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
          getAddMerchantExaminationMethod({project_code:projectCode, shelf_status:2, page_index: pageIndexManageAdd, page_size: pageSizeManageAdd })
          setVisiblemanage(false)
          setVisibleSelect(true)
        }}>+添加项目</Button>
        <Table columns={Managecolumns} dataSource={merchantExaminationColumns} 
          pagination={{
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChangeManage,
            pageSize: pageSizeManage,
            current: pageIndexManage,
            total: pageTotalManage,
            onChange: pageChangeManage
          }
          }
        />
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
            <Input placeholder="请输入项目编码" value={projectCode} onChange={(e) => { setProjectCode(e.target.value) }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={()=>{ getAddMerchantExaminationMethod({project_code:projectCode, shelf_status:2, page_index: pageIndexManageAdd, page_size: pageSizeManageAdd })}}>
              查询
          </Button>
          </Form.Item>
        </Form>
        <Table columns={Selectcolumns} dataSource={addMerchantExaminationColumns} 
         pagination={{
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChangeManageAdd,
          pageSize: pageSizeManageAdd,
          current: pageIndexManageAdd,
          total: pageTotalManageAdd,
          onChange: pageChangeManageAdd
        }
        }
        />
      </Modal>
      <Modal
        title="下架项目"
        visible={visibleLowershelf}
        onOk={LowershelfOk}
        onCancel={() => { setVisibleLowershelf(false) }}
        width={400}
        maskClosable={false}
      >
        确定要下架该项目吗？
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageWorks);
