import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Spin, Modal, Input, Radio, DatePicker, notification } from 'antd';
import debounce from 'lodash/debounce';
import BasicInfo from '@/components/PrivateComponents/BasicInfo';
import RichTextEditor from '@/components/PrivateComponents/RichTextEditor';
import {
  BasicInformationInterface,
  ButtonType,
  ExtraActionItemInterface,
  ObjectInterface,
  PagePropsInterface,
} from '@/components/Interface';
import { ConnectState } from '@/models/connect';
import DB from '@/DB';
import UploadFile from '@/components/PrivateComponents/Upload';
import { infoIsValid } from '@/utils/utils';
import styles from './index.less';
import ZoomPicture from '@/components/PrivateComponents/ZoomPicture';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const basicInformation = {
  title: '活动信息',
  pictureLabel: '',
  contentArr: [
    {
      key: 'first',
      itemArr: [
        {
          label: '活动ID：',
          text: '',
        },
        {
          label: '活动标题：',
          text: '',
        },
        {
          label: '活动简介：',
          text: '',
        },
      ],
    },
    {
      key: 'second',
      itemArr: [
        {
          label: '创建时间：',
          text: '',
        },
        {
          label: '更新时间：',
          text: '',
        },
        {
          label: '活动日期：',
          text: '',
        },
      ],
    },
  ],
  extraActions: [
    {
      text: '编辑',
      type: ButtonType.Primary,
      id: 'edit',
    },
  ],
};

const initEditInfo = {
  title: '',
  labelName: '',
  imageUrl: '',
  isOnline: 0,
  gmtBegin: '',
  gmtEnd: '',
};

interface EditInfoInterface {
  title: string;
  labelName: string;
  imageUrl: string;
  isOnline: number;
  gmtBegin: string;
  gmtEnd: string;
}

const ManageOperationActivityDetail = (props: PagePropsInterface) => {
  const {
    query: { id },
  } = props.location;
  const page = 'manage_operation_activity';
  const { dispatch } = props;
  const { detailsUrl, modifyUrl } = DB[page];
  const { info = {} } = props.details || {};

  const [updateDetailInfo, setUpdateDetailInfo] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [basicInfo, setBasicInfo] = useState<BasicInformationInterface>(basicInformation);
  const [editInfo, setEditInfo] = useState<EditInfoInterface>({ ...initEditInfo });
  const [isZoomPicture, setIsZoomPicture] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const loadDetailInfo = async () => {
      await dispatch({
        type: 'details/getInfo',
        payload: { detailsUrl: detailsUrl.replace('{id}', id) },
      });
      setLoading(false);
    };
    loadDetailInfo();
  }, [updateDetailInfo]);

  useEffect(() => {
    const contentArr = [
      {
        key: 'first',
        itemArr: [
          {
            label: '活动ID：',
            text: info.id,
          },
          {
            label: '活动标题：',
            text: info.title,
          },
          {
            label: '活动简介：',
            text: info.describes,
          },
        ],
      },
      {
        key: 'second',
        itemArr: [
          {
            label: '创建时间：',
            text: info.gmtCreate,
          },
          {
            label: '更新时间：',
            text: info.gmtModified,
          },
          {
            label: '活动日期：',
            text: `${info.gmtBegin} - ${info.gmtEnd}`,
          },
        ],
      },
    ];
    const newBasicInfo = { ...basicInformation, contentArr };
    setBasicInfo(newBasicInfo);
    setLoading(false);
  }, [props.details]);

  const onActionsHandle = (action: ExtraActionItemInterface) => {
    if (action.id === 'edit') {
      setModalVisible(true);
      const { title, labelName, imageUrl, isOnline, gmtBegin, gmtEnd } = info;
      setEditInfo({ title, labelName, imageUrl, isOnline, gmtBegin, gmtEnd });
    }
  };

  const modifyInfo = async (params: ObjectInterface) => {
    await dispatch({
      type: 'modify/modifyInfo',
      payload: { modifyUrl, params: { id, ...params } },
    });
    setUpdateDetailInfo(!updateDetailInfo);
  };

  const onConfirmEdit = async () => {
    if (infoIsValid(editInfo)) {
      setModalLoading(true);
      await modifyInfo(editInfo);
      setModalVisible(false);
      setModalLoading(false);
    } else {
      notification.error({
        message: `请填写完整信息！`,
      });
    }
  };

  const onEditInfoChange = debounce(
    (key: string, value: string) =>
      setEditInfo((prevEditInfo: EditInfoInterface) => ({
        ...prevEditInfo,
        [`${key}`]: value,
      })),
    300,
  );

  const saveEditorContentHandle = async (htmlContent: string) => {
    try {
      setLoading(true);
      await modifyInfo({ content: htmlContent });
      notification.success({ message: '修改成功！' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
        <hr />
        <BasicInfo basicInfo={basicInfo} onActionsHandle={onActionsHandle} />
        <hr />

        <div className={styles.basic_block}>
          <h3 style={{ marginBottom: '0' }}>活动展示图</h3>
          <div className={styles.icon} onClick={() => setIsZoomPicture(true)}>
            <img src={info.imageUrl || ''} alt="" />
          </div>
        </div>

        <div className={styles.basic_block}>
          <RichTextEditor
            title="活动详情"
            htmlContent={info.content || ''}
            saveEditorContentHandle={saveEditorContentHandle}
          />
        </div>

        {isZoomPicture ? (
          <ZoomPicture
            pictureSrc={info.imageUrl || ''}
            onCancelHandle={() => setIsZoomPicture(false)}
          />
        ) : null}

        <Modal
          title="编辑活动"
          visible={modalVisible}
          onOk={onConfirmEdit}
          onCancel={() => setModalVisible(false)}
          destroyOnClose
          maskClosable={false}
          closable={false}
          okButtonProps={{ disabled: modalLoading }}
          cancelButtonProps={{ disabled: modalLoading }}
        >
          <Spin spinning={modalLoading} size="large">
            <div className={styles.flex}>
              <div className={styles.basic_label}>活动标题：</div>
              <Input
                defaultValue={info.title}
                onChange={e => onEditInfoChange('title', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>活动简介：</div>
              <Input
                defaultValue={info.describes}
                onChange={e => onEditInfoChange('describes', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>活动标签：</div>
              <Input
                defaultValue={info.labelName}
                onChange={e => onEditInfoChange('labelName', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>活动图片：</div>
              <UploadFile
                defaultValue={info.imageUrl}
                uploadSuccess={(url: string) => onEditInfoChange('imageUrl', url)}
                isInit={modalVisible}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>状态：</div>
              <Radio.Group
                onChange={e => onEditInfoChange('isOnline', e.target.value)}
                defaultValue={info.isOnline}
              >
                <Radio value={1}>上架</Radio>
                <Radio value={0}>下架</Radio>
              </Radio.Group>
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>活动日期：</div>
              <RangePicker
                showTime={{ format: 'HH:mm:ss' }}
                defaultValue={[moment(info.gmtBegin, dateFormat), moment(info.gmtEnd, dateFormat)]}
                onChange={(date, dateString) => {
                  onEditInfoChange('gmtBegin', dateString[0]);
                  setTimeout(() => onEditInfoChange('gmtEnd', dateString[1]), 350);
                }}
              />
            </div>
          </Spin>
        </Modal>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ details }: ConnectState) => ({ details }))(ManageOperationActivityDetail);
