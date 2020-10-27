import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useCallback } from 'react';
import { connect } from 'dva';
import { notification, Modal, Input, Spin } from 'antd';
import { ActionInterface, ObjectInterface, PagePropsInterface } from '@/components/Interface';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import { infoIsValid } from '@/utils/utils';
import DB from '@/DB';
import UploadFile from '@/components/PrivateComponents/Upload';
import ZoomPicture from '@/components/PrivateComponents/ZoomPicture';
import styles from './index.less';

const initModifyInfo = { name: '', imageUrl: '' };

interface ModifyInfoInterface {
  name: string;
  imageUrl: string;
}

const ManageSystemStyleTags = (props: PagePropsInterface) => {
  const page = 'style_tags';
  const { modifyUrl, addUrl } = DB[page];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ObjectInterface>({});
  const [modifyInfo, setModifyInfo] = useState<ModifyInfoInterface>({ ...initModifyInfo });
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isZoomPicture, setIsZoomPicture] = useState<boolean>(false);
  const [zoomPicSrc, setZoomPicSrc] = useState<string>('');

  const searchActionsHandle = (action: ActionInterface) => {
    if (action.key === 'add') {
      setModifyInfo({ ...initModifyInfo });
      setModalInfo({ title: '新增标签', key: 'add' });
      setModalVisible(true);
    }
  };

  const actionsHandle = (action: ActionInterface, record: any) => {
    if (action.key === 'view') {
      if (record.imageUrl) {
        setZoomPicSrc(record.imageUrl);
        setIsZoomPicture(true);
      } else {
        notification.error({
          message: `该订单没有合成图！`,
        });
      }
    }
    if (action.key === 'edit') {
      setModalInfo({ title: '编辑标签', key: 'edit', ...record });
      const { name, imageUrl } = record;
      setModifyInfo({ name, imageUrl });
      setModalVisible(true);
    }
  };

  const onConfirmModifyInfo = async () => {
    if (infoIsValid(modifyInfo)) {
      setModalLoading(true);
      const { key, id } = modalInfo;
      const params = Object.assign(
        modifyInfo,
        key === 'add' ? { parentId: 0, position: 1 } : { id },
      );
      await props.dispatch({
        type: 'modify/modifyInfo',
        payload: { modifyUrl: key === 'add' ? addUrl : modifyUrl, params },
      });
      setRefresh(!refresh);
      setModalVisible(false);
      setModalLoading(false);
    } else {
      notification.error({
        message: `请填写完整信息！`,
      });
    }
  };

  const onModifyInfoChange = (key: string, value: string | number) =>
    setModifyInfo((prevEditInfo: ModifyInfoInterface) => ({
      ...prevEditInfo,
      [`${key}`]: value,
    }));

  return (
    <PageHeaderWrapper className={styles.main}>
      <PageBasic
        page={page}
        refresh={refresh}
        searchActionsHandle={searchActionsHandle}
        actionsHandle={actionsHandle}
      />

      {isZoomPicture ? (
        <ZoomPicture
          pictureSrc={zoomPicSrc || ''}
          onCancelHandle={() => {
            setZoomPicSrc('');
            setIsZoomPicture(false);
          }}
        />
      ) : null}

      <Modal
        title={modalInfo.title}
        visible={modalVisible}
        onOk={onConfirmModifyInfo}
        key={modalInfo.key}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
        maskClosable={false}
        closable={false}
        okButtonProps={{ disabled: modalLoading }}
        cancelButtonProps={{ disabled: modalLoading }}
      >
        <Spin spinning={modalLoading} size="large">
          <div className={styles.flex}>
            <div className={styles.basic_label}>风格名称：</div>
            <Input
              maxLength={6}
              value={modifyInfo.name}
              onChange={e => onModifyInfoChange('name', e.target.value)}
            />
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.basic_label}>风格图片：</div>
            <UploadFile
              defaultValue={modifyInfo.imageUrl}
              uploadSuccess={useCallback((url: string) => onModifyInfoChange('imageUrl', url), [
                modalInfo,
              ])}
              isInit={modalVisible}
            />
          </div>
          <div className={styles.basic_block} />
        </Spin>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageSystemStyleTags);
