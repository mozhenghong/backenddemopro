import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useCallback, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs, Modal, Input, Radio, notification, DatePicker, Spin } from 'antd';
import { ActionInterface, PagePropsInterface } from '@/components/Interface';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import UploadFile from '@/components/PrivateComponents/Upload';
import debounce from 'lodash/debounce';
import DB from '@/DB';
import { infoIsValid } from '@/utils/utils';
import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const initBannerInfo = { title: '', imageUrl: '', isOnline: 0, position: 1, describes: '' };
const initActivityInfo = {
  title: '',
  imageUrl: '',
  isOnline: 0,
  labelName: '',
  gmtBegin: '',
  gmtEnd: '',
};
const initModalInfo = { title: '新增 banner', key: 'banner' };

interface AddInfoInterface {
  title: string;
  imageUrl: string;
  isOnline: number;
}

interface AddBannerInterface extends AddInfoInterface {
  describes: string;
  position: number;
}

interface AddActivityInterface extends AddInfoInterface {
  labelName: string;
  gmtBegin: string;
  gmtEnd: string;
}

interface ModalInfoInterface {
  title: string;
  key: string;
}

const ManageOperation = (props: PagePropsInterface) => {
  const tabList = [
    {
      key: 'manage_operation_banner',
      title: 'banner',
    },
    { key: 'manage_operation_activity', title: '活动' },
  ];
  const { dispatch } = props;

  const [refresh, setRefresh] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [selectTab, setSelectTab] = useState<string>('manage_operation_banner');
  const [modalInfo, setModalInfo] = useState<ModalInfoInterface>({ ...initModalInfo });

  const [addBannerInfo, setAddBannerInfo] = useState<AddBannerInterface>({ ...initBannerInfo });
  const [addActivityInfo, setAddActivityInfo] = useState<AddActivityInterface>({
    ...initActivityInfo,
  });

  const searchActionsHandle = (action: ActionInterface) => {
    if (action.key === 'add') {
      if (selectTab === 'manage_operation_banner') {
        setModalInfo({ title: '新增 banner', key: 'banner' });
      } else {
        setModalInfo({ title: '新增活动', key: 'activity' });
      }
      setModalVisible(true);
    }
  };

  const onConfirmHandle = async () => {
    const params = modalInfo.key === 'banner' ? addBannerInfo : addActivityInfo;
    if (infoIsValid(params)) {
      setModalLoading(true);
      await dispatch({
        type: 'modify/modifyInfo',
        payload: { modifyUrl: DB[selectTab].addUrl, params },
      });
      setRefresh(!refresh);
      setModalVisible(false);
      setAddBannerInfo({ ...initBannerInfo });
      setAddActivityInfo({ ...initActivityInfo });
      setModalLoading(false);
    } else {
      notification.error({
        message: `请填写完整信息！`,
      });
    }
  };

  const onAddInfoChange = debounce(
    (key: string, value: string | number) =>
      modalInfo.key === 'banner'
        ? setAddBannerInfo((prevEditInfo: AddBannerInterface) => ({
            ...prevEditInfo,
            [`${key}`]: value,
          }))
        : setAddActivityInfo((prevEditInfo: AddActivityInterface) => ({
            ...prevEditInfo,
            [`${key}`]: value,
          })),
    300,
  );

  return (
    <PageHeaderWrapper className={styles.main}>
      <Tabs defaultActiveKey={selectTab} onChange={(key: string) => setSelectTab(key)}>
        {tabList.map(tab => (
          <TabPane tab={tab.title} key={tab.key}>
            <PageBasic page={tab.key} refresh={refresh} searchActionsHandle={searchActionsHandle} />
          </TabPane>
        ))}
      </Tabs>

      <Modal
        title={modalInfo.title}
        visible={modalVisible}
        key={modalInfo.key}
        onOk={onConfirmHandle}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
        maskClosable={false}
        closable={false}
        okButtonProps={{ disabled: modalLoading }}
        cancelButtonProps={{ disabled: modalLoading }}
      >
        <Spin spinning={modalLoading} size="large">
          <div className={styles.flex}>
            <div className={styles.basic_label}>
              {modalInfo.key === 'banner' ? 'banner' : '活动'}标题：
            </div>
            <Input onChange={e => onAddInfoChange('title', e.target.value)} />
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>
              {modalInfo.key === 'banner' ? 'banner' : '活动'}简介：
            </div>
            <Input onChange={e => onAddInfoChange('describes', e.target.value)} />
          </div>
          {modalInfo.key === 'banner' ? null : (
            <Fragment>
              <div className={styles.basic_block} />
              <div className={styles.flex}>
                <div className={styles.basic_label}>活动标签：</div>
                <Input onChange={e => onAddInfoChange('labelName', e.target.value)} />
              </div>
            </Fragment>
          )}
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>
              {modalInfo.key === 'banner' ? 'banner' : '活动'}图片：
            </div>
            <UploadFile
              uploadSuccess={useCallback((url: string) => onAddInfoChange('imageUrl', url), [
                modalInfo,
              ])}
              isInit={modalVisible}
            />
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>状态：</div>
            <Radio.Group
              onChange={e => onAddInfoChange('isOnline', e.target.value)}
              defaultValue={0}
            >
              <Radio value={1}>上架</Radio>
              <Radio value={0}>下架</Radio>
            </Radio.Group>
          </div>
          <div className={styles.basic_block} />
          {modalInfo.key === 'activity' ? (
            <div className={styles.flex}>
              <div className={styles.basic_label}>活动日期：</div>
              <RangePicker
                showTime={{ format: 'HH:mm:ss' }}
                onChange={(date, dateString) => {
                  onAddInfoChange('gmtBegin', dateString[0]);
                  setTimeout(() => onAddInfoChange('gmtEnd', dateString[1]), 350);
                }}
              />
            </div>
          ) : null}
        </Spin>
      </Modal>
    </PageHeaderWrapper>
  );
};
export default connect(() => ({}))(ManageOperation);
