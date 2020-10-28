import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Form, Button, Input, Select, Table, Tag, Modal, Checkbox, Upload, message, Popover, Descriptions, Badge } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { priceDictionary, brandDictionary, getProjectList, upperShelf, lowersShelf, getSelectProjectList, addProjectList, getProjectDetail} from '@/services/alipay';


const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const ManageUser = () => {
  // 项目列表相关
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [priceArea, setPriceArea] = useState(1);
  const [brandId, setBrandId] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageTotal, setPageTotal] = useState(40);
  const [visibleUpperShelf, setVisibleUpperShelf] = useState(false);
  const [upperShelfId, setUpperShelfId] = useState('');
  const [visibleLowershelf, setVisibleLowershelf] = useState(false);
  const [lowershelfId, setLowershelfId] = useState('');
  // B端项目列表相关
  const [projectCodeB, setProjectCodeB] = useState('');
  const [priceAreaB, setPriceAreaB] = useState(1);
  const [brandIdB, setBrandIdB] = useState(1);
  const [pageIndexB, setPageIndexB] = useState(1);
  const [pageSizeB, setPageSizeB] = useState(20);
  const [pageTotalB, setPageTotalB] = useState(40);
 
  //添加项目相关
  const [selectedRecord, setSelectedRecord] = useState({});
  const [significance, setSignificance] = useState('11');
  const [packageName, setPackageName] = useState('');
  const [labels, setLabels] = useState('');
  const [featureItem, setFeatureItem] = useState(['肠胃疾病', '甲状腺检查']);
  const [contractPrice, setContractPrice] = useState(0);
  const [settlementPrice, setSettlementPrice] = useState(0);
  const [samplingPrice, setSamplingPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading2, setLoading2] = useState(false);
  const [imageUrl2, setImageUrl2] = useState('');
  const [goodsDesc, setGoodsDesc] = useState('');
  const [targetGroup, setTargetGroup] = useState('');

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [priceDictionarylist, setPriceDictionarylist] = useState([
    { id: 1, name: '区域1' },
    { id: 2, name: '区域2' },
    { id: 3, name: '区域3' },
  ])
  const [brandDictionarylist, setBrandDictionarylist] = useState([
    { id: 1, name: '品牌1' },
    { id: 2, name: '品牌2' },
    { id: 3, name: '品牌3' },
  ])
  // 查询项目管理列表
  const getProjectListMethod = () => {
    getProjectList({ 'project_name': projectName, 'project_code': projectCode, 'price_area_id': priceArea, 'brand_id': brandId, 'page_index': pageIndex, 'page_size': pageSize }).then(() => {

    })
  }
  //查询B端项目列表
  const getSelectProjectListMethod = () => {
    getSelectProjectList({ 'project_code': projectCodeB, 'price_area_id': priceAreaB, 'brand_id': brandIdB, 'page_index': pageIndexB, 'page_size': pageSizeB }).then(() => {

    })
  }
  //添加项目
  const addProjectListMethod = () => {
    addProjectList({...selectedRecord,significance, package_name:packageName, labels, feature_item:featureItem, contract_price: Number(contractPrice), settlement_price:Number(settlementPrice), 
      sampling_price:Number(samplingPrice), list_image:imageUrl,detail_image: imageUrl2, goods_desc:goodsDesc, target_group:targetGroup}).then(() => {

    })
  }
  //查询项目详情
  const getProjectDetailMethod = (data) => {
    getProjectDetail(data).then((res) => {
      // setSelectedRecord(res.data)
      // setSignificance(res.data.significance)
      // setPackageName(res.data.package_name)
      // setLabels(res.data.labels)
      // setFeatureItem(res.data.feature_item)
      // setContractPrice(res.data.contract_price)
      // setSettlementPrice(res.data.settlement_price)
      // setSamplingPrice(res.data.sampling_price)
      // setImageUrl(res.data.list_image)
      // setImageUrl2(res.data.detail_image)
      // setGoodsDesc(res.data.goods_desc)
      // setTargetGroup(res.data.target_group)
    })
  }
  useEffect(() => {
    priceDictionary().then((res) => {
      // setPriceDictionarylist(res.data)
    })
    brandDictionary().then((res) => {
      // setBrandDictionarylist(res.data)
    })
    getProjectListMethod()
    getSelectProjectListMethod()
  }, []);

  const Selectcolumns = [
    {
      title: '项目编码',
      dataIndex: 'project_code',
      key: 'name',
    },
    {
      title: '价格区域',
      dataIndex: 'price_area_name',
      key: 'price_area_name',
    },
    {
      title: '项目简称',
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
      title: '基准价',
      dataIndex: 'benchmark_price',
      key: 'benchmark_price',
    },
    {
      title: '标本量',
      dataIndex: 'samples',
      key: 'samples',
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            getProjectDetailMethod({examination_package_id: record.examination_package_id, project_code: record.project_code, brand_id:record.brand_id, price_area_id: record.price_area_id})
            setVisibleSelect(false)
            setVisibleAdd(true)           
          }}>选择</a>
        </div>
      ),
    },
  ]
  const AddcolumnsDetail = [
    {
      title: '项目编码',
      dataIndex: 'project_code',
      key: 'project_code',
    },
    {
      title: '项目名称',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: '子项名称',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: '子项检测意义',
      dataIndex: 'significance',
      key: 'significance',
    },
  ]
  const columns = [
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
      title: '项目简称',
      dataIndex: 'price_area_name',
      key: 'price_area_name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '检测意义',
      dataIndex: 'significance',
      key: 'significance',
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
    },
    {

      title: '套餐类型',
      dataIndex: 'labels',
      key: 'labels',
    },
    {
      title: '售卖价',
      dataIndex: 'contract_price',
      key: 'contract_price',
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
      title: '添加时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
    },
    {
      title: '修改时间',
      dataIndex: 'gmtUpdate',
      key: 'gmtUpdate',
    },
    {
      title: '状态',
      dataIndex: 'shelf_status',
      key: 'shelf_status',
      render: (text, record) => {
        if (record.shelf_status === 1) {
          return <span>已下架</span>
        } else if (record.shelf_status === 2) {
          return <span>已上架</span>
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a style={{ padding: '0 5px' }} onClick={() => {
            setIsAdd(false)
            getProjectDetailMethod({examination_package_id: record.examination_package_id})
            setVisibleAdd(true)
          }}>编辑</a>
          {record.shelf_status === 1 && <a style={{ padding: '0 5px' }} onClick={() => {
            setVisibleUpperShelf(true)
            setUpperShelfId(record.examination_package_id)
          }}>上架</a>}
          {record.shelf_status === 2 && <a style={{ padding: '0 5px' }} onClick={() => {
            setVisibleLowershelf(true)
            setLowershelfId(record.examination_package_id)
          }}>下架</a>}
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
      significance: 0,
      gender: 0,
      shelf_status: 1,
      examination_package_id: '1111',
      project_name: '啦啦啦啦',
      project_code: '777', 
      brand_id: '888', 
      price_area_id: '444'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      significance: 1,
      shelf_status: 2,
      gender: 1,
      examination_package_id: '3333',
      project_name: '哈哈哈',


    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      significance: 2,
      shelf_status: 1,
      gender: 2,
      examination_package_id: '5555'
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
  const onShowSizeChangeB = (current, pageSize) => {
    setPageIndexB(current)
    setPageSizeB(pageSize)
  }
  const pageChangeB = (current, pageSize) => {
    setPageIndexB(current)
    setPageSizeB(pageSize)
  }
  const UpperShelfOk = () => {
    upperShelf({ 'examination_package_id': upperShelfId }).then((res) => {
      setVisibleUpperShelf(false)
    })
  }
  const LowershelfOk = () => {
    lowersShelf({ 'examination_package_id': lowershelfId }).then((res) => {
      setVisibleLowershelf(false)
    })
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(true)
        setImageUrl(imageUrl)
      }
      );
    }
  };
  const handleChangeDetail = info => {
    if (info.file.status === 'uploading') {
      setLoading2(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading2(true)
        setImageUrl2(imageUrl)
      }
      );
    }
  };
  const onReset = () => {
    setProjectName('')
    setProjectCode('')
    setPriceArea(1)
    setBrandId(1)
    setPageIndex(1)
    setPageSize(20)
    getProjectList({ 'project_name': '', 'project_code': '', 'price_area_id': null, 'brand_id': null, 'page_index': 1, 'page_size': 20 }).then(() => {
    })
  }

  const handleAdd = () => {
    setVisibleAdd(true)
  }
  const handleOk = () => {
    addProjectListMethod()
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
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadButton2 = (
    <div>
      {loading2 ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <PageHeaderWrapper className={styles.main}>
      {/* <PageBasic page={page} /> */}
      <Form layout="inline">
        <Form.Item label="项目简称">
          <Input placeholder="请输入项目简称" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="项目编码">
          <Input placeholder="请输入项目编码" value={projectCode} onChange={(e) => { setProjectCode(e.target.value) }} />
        </Form.Item>
        <Form.Item label="价格区域">
          <Select style={{ width: '200px' }} value={priceArea} onChange={(value) => { setPriceArea(value) }}>
            {priceDictionarylist.map((item) => {
              return <Select.Option value={item.id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="品牌">
          <Select style={{ width: '200px' }} value={brandId} onChange={(value) => { setBrandId(value) }}>
            {brandDictionarylist.map((item) => {
              return <Select.Option value={item.id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={onReset} style={{ marginRight: '20px' }}>重置</Button>
          <Button type="primary" htmlType="submit" onClick={getProjectListMethod}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.addbutton}>
        <Button onClick={handleAdd} style={{ marginRight: '20px' }} type="primary" >新增项目</Button>
      </div>
      <Table columns={columns} dataSource={data}
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
          pageSize: pageSize,
          current: pageIndex,
          total: pageTotal,
          onChange: pageChange
        }
        } />
      {/* 新增弹窗 */}
      <Modal
        title={isAdd?'新增项目':'编辑项目'}
        visible={visibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        maskClosable={false}
      >
        <Button type="primary" onClick={() => {
          setVisibleAdd(false)
          setVisibleSelect(true)
        }}>+选择项目</Button>
        <div className={styles.addTitle}>基础信息</div>
        <Descriptions title="" layout="vertical" bordered column={8}>
          <Descriptions.Item label="项目编码">{selectedRecord.project_code&&selectedRecord.project_code}</Descriptions.Item>
          <Descriptions.Item label="价格区域">{selectedRecord.price_area_name&&selectedRecord.price_area_name}</Descriptions.Item>
          <Descriptions.Item label="项目简称">{selectedRecord.project_name&&selectedRecord.project_name}</Descriptions.Item>
          {selectedRecord.gender&&selectedRecord.gender==0&&<Descriptions.Item label="性别">男</Descriptions.Item>}
          {selectedRecord.gender&&selectedRecord.gender==1&&<Descriptions.Item label="性别">女</Descriptions.Item>}
          {selectedRecord.gender&&selectedRecord.gender==2&&<Descriptions.Item label="性别">通用</Descriptions.Item>}
          <Descriptions.Item label="基准价">{selectedRecord.benchmark_price&&selectedRecord.benchmark_price}</Descriptions.Item>
          <Descriptions.Item label="标本量">{selectedRecord.samples&&selectedRecord.samples}</Descriptions.Item>
          <Descriptions.Item label="品牌">{selectedRecord.brand_name&&selectedRecord.brand_name}</Descriptions.Item>
          <Descriptions.Item label="品牌项目名">{selectedRecord.brand_project_name&&selectedRecord.brand_project_name}</Descriptions.Item>
        </Descriptions>
        <div className={styles.detailTitle}>项目明细：</div>
          <Table columns={AddcolumnsDetail} dataSource={selectedRecord.examination_item_list||[]} pagination={false} />
        <div className={styles.detailTitle}>套餐检测意义：</div>
        <TextArea rows={4} value={significance} onChange={(e) => setSignificance(e.target.value)} />
        <div className={styles.addTitle}>补充信息</div>
        <Form {...layout} name="nest-messages" style={{ paddingTop: '20px' }}>
          <Form.Item label="商品名称" >
            <Input value={packageName} onChange={(e) => setPackageName(e.target.value)}/>
          </Form.Item>
          <Form.Item label="套餐分类">
            <Select style={{ width: '200px' }} value={labels} onChange={(value) => { setLabels(value) }}>
              <Select.Option value="入职体检">入职体检</Select.Option>
              <Select.Option value="父母体检">父母体检</Select.Option>
              <Select.Option value="女性体检">女性体检</Select.Option>
              <Select.Option value="中青年体检">中青年体检</Select.Option>
              <Select.Option value="应酬族体检">应酬族体检</Select.Option>
              <Select.Option value="肿瘤筛查">肿瘤筛查</Select.Option>
              <Select.Option value="肠胃套餐">肠胃套餐</Select.Option>
              <Select.Option value="健康证">健康证</Select.Option>
              <Select.Option value="驾照体检">驾照体检</Select.Option>
              <Select.Option value="孕前检查">孕前检查</Select.Option>
              <Select.Option value="儿童体检">儿童体检</Select.Option>
              <Select.Option value="核酸检测">核酸检测</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="特色项目" >
            <Checkbox.Group 
              options={['肠胃疾病', '甲状腺检查', '肿瘤筛查', '三高检测', '妇科检查', '乳腺检查', '前列腺检查', '心脑血管检查', '胸肺部检查', '肝胆检查', '肾功能', '颈椎腰椎']} 
              value={featureItem} 
              onChange={(value) => { setFeatureItem(value) }}
           />
          </Form.Item>
          <Form.Item label="售卖价">
            <Input value={contractPrice} onChange={(e) => setContractPrice(e.target.value)}/>
          </Form.Item>
          <Form.Item label="采购价" >
            <Input value={settlementPrice} onChange={(e) => setSettlementPrice(e.target.value)}/>
          </Form.Item>
          <Form.Item label="采样提成">
            <Input value={samplingPrice} onChange={(e) => setSamplingPrice(e.target.value)}/>
          </Form.Item>
          <Form.Item label="主图">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="详情图">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChangeDetail}
            >
              {imageUrl2 ? <img src={imageUrl2} alt="avatar" style={{ width: '100%' }} /> : uploadButton2}
            </Upload>
          </Form.Item>
          <Form.Item label="商品描述">
            <TextArea value={goodsDesc} onChange={(e) => setGoodsDesc(e.target.value)}/>
          </Form.Item>
          <Form.Item label="目的人群">
            <TextArea value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>
      {/* 选择项目弹窗 */}
      <Modal
        title="选择项目"
        visible={visibleSelect}
        onOk={handleSelectOk}
        onCancel={handleSelectCancel}
        width={1200}
        maskClosable={false}
        footer={null}
      >
        <Form layout="inline">
          <Form.Item label="项目编码">
            <Input placeholder="请输入项目编码" value={projectCodeB} onChange={(e) => { setProjectCodeB(e.target.value) }} />
          </Form.Item>
          <Form.Item label="价格区域">
            <Select style={{ width: '200px' }} value={priceAreaB} onChange={(value) => { setPriceAreaB(value) }}>
              {priceDictionarylist.map((item) => {
                return <Select.Option value={item.id}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label="品牌">
            <Select style={{ width: '200px' }} value={brandIdB} onChange={(value) => { setBrandIdB(value) }}>
              {brandDictionarylist.map((item) => {
                return <Select.Option value={item.id}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => { getSelectProjectListMethod() }}>
              查询
          </Button>
          </Form.Item>
        </Form>
        <Table columns={Selectcolumns} dataSource={data}
          pagination={{
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChangeB,
            pageSize: pageSizeB,
            current: pageIndexB,
            total: pageTotalB,
            onChange: pageChangeB
          }}
        />
      </Modal>
      {/* 上架、下架modal */}
      <Modal
        title="上架项目"
        visible={visibleUpperShelf}
        onOk={UpperShelfOk}
        onCancel={() => { setVisibleUpperShelf(false) }}
        width={400}
        maskClosable={false}
      >
        确定要上架该项目吗？
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

export default connect(() => ({}))(ManageUser);
