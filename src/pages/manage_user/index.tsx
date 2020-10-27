import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Form, Button, Input, Select, Table, Tag, Modal, Checkbox, Upload, message, Popover } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';

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
  const page = 'manage_user';
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [range, setRange] = useState('');
  const [brand, setBrand] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [texareaValue, setTexareaValue] = useState('12323');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading2, setLoading2] = useState(false);
  const [imageUrl2, setImageUrl2] = useState('');




  const Addcolumns = [
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
      title: '基准价',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标本量',
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
      title: '基准价',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标本量',
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
      dataIndex: 'address',
      key: 'address',
      render: text => <a>{text}</a>,
    },
    {
      title: '检测意义',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '套餐类型',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '售卖价',
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
      title: '添加时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '修改时间',
      dataIndex: 'name',
      key: 'name',
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
            onVisibleChange={(visible) => {}}
          >
            <a style={{ padding: '0 5px' }} onClick={()=> {}}>上架</a>
          </Popover>
          <a style={{ padding: '0 5px' }}>下架</a>
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
          <Input placeholder="请输入项目简称" onChange={(e) => { setName(e.target.value) }} />
        </Form.Item>
        <Form.Item label="项目编码">
          <Input placeholder="请输入项目编码" onChange={(e) => { setCode(e.target.value) }} />
        </Form.Item>
        <Form.Item label="区域">
          <Select style={{ width: '200px' }} onChange={(value) => { setRange(value) }}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="品牌">
          <Select style={{ width: '200px' }} onChange={(value) => { setBrand(value) }}>
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
        <Button onClick={handleAdd} style={{ marginRight: '20px' }} type="primary" >新增项目</Button>
      </div>
      <Table columns={columns} dataSource={data} />
      {/* 新增弹窗 */}
      <Modal
        title="新增项目"
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
        <Table columns={Addcolumns} dataSource={data} pagination={false} />
        <div className={styles.detailTitle}>项目明细：</div>
        <Table columns={AddcolumnsDetail} dataSource={data} pagination={false} />
        <div className={styles.detailTitle}>套餐检测意义：</div>
        <TextArea rows={4} value={texareaValue} onChange={(e) => setTexareaValue(e.target.value)} />
        <div className={styles.addTitle}>补充信息</div>
        <Form {...layout} name="nest-messages" style={{ paddingTop: '20px' }}>
          <Form.Item label="商品名称" >
            <Input />
          </Form.Item>
          <Form.Item label="套餐分类">
            <Select style={{ width: '200px' }} onChange={(value) => { setRange(value) }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="特色项目">
            <Checkbox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} onChange={(value) => { console.log(value) }} />
          </Form.Item>
          <Form.Item label="售卖价">
            <Input />
          </Form.Item>
          <Form.Item label="采购价">
            <Input />
          </Form.Item>
          <Form.Item label="采样提成">
            <Input />
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
            <TextArea />
          </Form.Item>
          <Form.Item label="目的人群">
            <TextArea />
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
            <Input placeholder="请输入项目编码" onChange={(e) => { setCode(e.target.value) }} />
          </Form.Item>
          <Form.Item label="区域">
            <Select style={{ width: '200px' }} onChange={(value) => { setRange(value) }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="品牌">
            <Select style={{ width: '200px' }} onChange={(value) => { setBrand(value) }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
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

export default connect(() => ({}))(ManageUser);
