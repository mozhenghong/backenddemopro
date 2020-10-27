import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Spin, Button, Radio, Input, Modal, notification } from 'antd';
import debounce from 'lodash/debounce';
import BasicInfo from '@/components/PrivateComponents/BasicInfo';
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

const basicInformation = {
  title: 'banner信息',
  pictureLabel: '',
  contentArr: [
    {
      key: 'first',
      itemArr: [
        {
          label: 'bannerID：',
          text: '',
        },
        {
          label: 'banner标题：',
          text: '',
        },
        {
          label: 'banner简介：',
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
const initEditInfo = { title: '', describes: '', imageUrl: '' };
const initJumpInfo = { jumpType: 0, jumpUrl: '' };

interface EditInfoInterface {
  title: string;
  imageUrl: string;
  describes?: string;
}

interface JumpInfoInterface {
  jumpType: number; // 0：无，1：外部链接，2：活动
  jumpUrl: string;
}

enum BannerSkipActionEnum {
  Save = '保存',
  Edit = '编辑',
}

const ManageOperationBannerDetail = (props: PagePropsInterface) => {
  const {
    query: { id },
  } = props.location;
  const page = 'manage_operation_banner';
  const { dispatch } = props;
  const { detailsUrl, modifyUrl } = DB[page];
  const { info = {} } = props.details || {};

  const [updateDetail, setUpdateDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [basicInfo, setBasicInfo] = useState<BasicInformationInterface>(basicInformation);
  const [editInfo, setEditInfo] = useState<EditInfoInterface>({ ...initEditInfo });
  const [jumpInfo, setJumpInfo] = useState<JumpInfoInterface>({ ...initJumpInfo });
  const [bannerSkipAction, setBannerSkipAction] = useState<BannerSkipActionEnum>(
    BannerSkipActionEnum.Edit,
  );

  useEffect(() => {
    setLoading(true);
    const loadDetailInfo = async () => {
      await dispatch({
        type: 'details/getInfo',
        payload: { detailsUrl: detailsUrl.replace('{id}', id) },
      });
      setLoading(false);
    };
    void loadDetailInfo();
  }, [updateDetail]);

  useEffect(() => {
    const { jumpType = 0, jumpUrl = '', imageUrl = '', title = '', describes = '' } = info;
    const contentArr = [
      {
        key: 'first',
        itemArr: [
          {
            label: 'bannerID：',
            text: info.id,
          },
          {
            label: 'banner标题：',
            text: info.title,
          },
          {
            label: 'banner简介：',
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
        ],
      },
    ];
    setBasicInfo({ ...basicInformation, contentArr });
    setEditInfo({ title, describes, imageUrl });
    setJumpInfo({ jumpType, jumpUrl });
  }, [props.details]);

  const onActionsHandle = (action: ExtraActionItemInterface) => {
    if (action.id === 'edit') {
      setModalVisible(true);
    }
  };

  const modifyBannerInfo = async (params: ObjectInterface) => {
    await dispatch({
      type: 'modify/modifyInfo',
      payload: { modifyUrl, params },
    });
    setUpdateDetail(!updateDetail);
  };

  const errorTips = () => {
    notification.error({
      message: `请填写完整信息！`,
    });
  };

  const onConfirmEdit = async () => {
    if (infoIsValid(editInfo, ['describes'])) {
      setModalLoading(true);
      await modifyBannerInfo({ id, ...editInfo });
      setModalVisible(false);
      setModalLoading(false);
    } else {
      errorTips();
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

  const onJumpInfoChange = (key: string, value: string) =>
    setJumpInfo((prevEditInfo: JumpInfoInterface) => ({
      ...prevEditInfo,
      [`${key}`]: value,
    }));

  const onBannerSkipActionChange = async () => {
    if (bannerSkipAction === BannerSkipActionEnum.Edit) {
      setBannerSkipAction(BannerSkipActionEnum.Save);
    } else {
      // 保存
      const { jumpType, jumpUrl } = jumpInfo;
      if (jumpType === 0 || (jumpType && jumpUrl)) {
        setLoading(true);
        const params = Object.assign({ id, jumpType }, jumpType === 0 ? {} : { jumpUrl });
        await modifyBannerInfo(params);
        setLoading(false);
        setBannerSkipAction(BannerSkipActionEnum.Edit);
      } else {
        errorTips();
      }
    }
  };

  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
        <hr />
        <BasicInfo basicInfo={basicInfo} onActionsHandle={onActionsHandle} />
        <hr />

        <div className={styles.basic_block}>
          <h3>banner展示图</h3>
          <div className={styles.icon}>
            <img src={info.imageUrl || ''} alt="" />
          </div>
        </div>

        <div className={styles.basic_block} style={{ maxWidth: '50%' }}>
          <div className={styles.flex}>
            <h3 style={{ marginBottom: '0' }}>banner跳转详情</h3>
            <Button
              type="primary"
              style={{ marginLeft: 'auto' }}
              onClick={onBannerSkipActionChange}
            >
              {bannerSkipAction}
            </Button>
          </div>
          <div className={styles.basic_block} />
          <div className={styles.flex}>
            <div className={styles.label}>跳转：</div>
            <Radio.Group
              disabled={bannerSkipAction === BannerSkipActionEnum.Edit}
              value={jumpInfo.jumpType}
              onChange={e => onJumpInfoChange('jumpType', e.target.value)}
            >
              <Radio.Button value={0}>无</Radio.Button>
              <Radio.Button value={2}>活动</Radio.Button>
              <Radio.Button value={1}>外部链接</Radio.Button>
            </Radio.Group>
          </div>

          {jumpInfo.jumpType !== 0 ? (
            <div className={styles.basic_block}>
              <div className={styles.flex}>
                <span className={styles.label}>
                  {jumpInfo.jumpType === 2 ? '活动ID' : '外部链接'}：
                </span>
                <Input
                  disabled={bannerSkipAction === BannerSkipActionEnum.Edit}
                  style={{ flex: '1' }}
                  type="text"
                  value={jumpInfo.jumpUrl}
                  onChange={e => onJumpInfoChange('jumpUrl', e.target.value)}
                />
              </div>
            </div>
          ) : null}
        </div>

        <Modal
          title="编辑 banner 信息"
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
              <div className={styles.basic_label}>banner标题：</div>
              <Input
                maxLength={10}
                defaultValue={info.title || ''}
                onChange={e => onEditInfoChange('title', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>banner简介：</div>
              <Input
                maxLength={10}
                defaultValue={info.describes || ''}
                onChange={e => onEditInfoChange('describes', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>banner图片：</div>
              <UploadFile
                defaultValue={info.imageUrl}
                uploadSuccess={(url: string) => onEditInfoChange('imageUrl', url)}
                isInit={modalVisible}
              />
            </div>
          </Spin>
        </Modal>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ details }: ConnectState) => ({ details }))(ManageOperationBannerDetail);
