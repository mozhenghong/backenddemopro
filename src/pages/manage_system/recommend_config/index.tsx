import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { connect } from 'dva';
import { Select, Modal, Input, Spin } from 'antd';
import { ActionInterface, ObjectInterface, PagePropsInterface } from '@/components/Interface';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import DB from '@/DB';
import styles from './index.less';

const { Option } = Select;
const initEditInfo = { id: 0, orderNo: 0, num: 0, listDescribes: '' };

interface EditInfoInterface {
  id: number;
  orderNo: number;
  num: number;
  listDescribes: string;
}

const ManageUser = (props: PagePropsInterface) => {
  const page = 'recommend_config';
  const { modifyUrl } = DB[page];
  const { dispatch } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [rowInfo, setRowInfo] = useState<ObjectInterface>({});
  const [editInfo, setEditInfo] = useState<EditInfoInterface>({ ...initEditInfo });

  const actionsHandle = (action: ActionInterface, record: any) => {
    if (action.key === 'edit') {
      setModalVisible(true);
      const { id, num, listDescribes, orderNo } = record;
      setRowInfo(record);
      setEditInfo({ id, num, listDescribes, orderNo });
    }
  };

  const onConfirmEdit = async () => {
    setModalLoading(true);
    await dispatch({
      type: 'modify/modifyInfo',
      payload: { modifyUrl, params: editInfo },
    });
    setModalVisible(false);
    setRefresh(!refresh);
    setModalLoading(false);
  };

  const onEditInfoChange = (key: string, value: number | string) =>
    setEditInfo((prevEditInfo: EditInfoInterface) => ({ ...prevEditInfo, [`${key}`]: value }));

  return (
    <PageHeaderWrapper className={styles.main}>
      <PageBasic
        page={page}
        hasSearchForm={false}
        refresh={refresh}
        actionsHandle={actionsHandle}
      />

      <Modal
        title="编辑推荐配置"
        visible={modalVisible}
        onOk={onConfirmEdit}
        key={rowInfo.id}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
        maskClosable={false}
        closable={false}
        okButtonProps={{ disabled: modalLoading }}
        cancelButtonProps={{ disabled: modalLoading }}
      >
        <Spin spinning={modalLoading} size="large">
          <div className={styles.flex}>
            <div className={styles.basic_label}>推荐位置：</div>
            <div>{rowInfo.position === 1 ? '首页' : '发现页'}</div>
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>推荐因子：</div>
            <div>{rowInfo.divisor}</div>
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>顺序：</div>
            <Select
              value={editInfo.orderNo}
              onChange={(value: number) => onEditInfoChange('orderNo', value)}
              style={{ flexBasis: '30%' }}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>数量：</div>
            <Select
              value={editInfo.num}
              onChange={(value: number) => onEditInfoChange('num', value)}
              style={{ flexBasis: '30%' }}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
              <Option value={10}>10</Option>
            </Select>
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>列表描述：</div>
            <Input
              maxLength={5}
              value={editInfo.listDescribes}
              onChange={e => onEditInfoChange('listDescribes', e.target.value)}
              style={{ flexBasis: '50%' }}
            />
          </div>
          <div className={styles.basic_block} />
        </Spin>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageUser);
