import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Spin, Modal, Radio, Checkbox, notification } from 'antd';
import debounce from 'lodash/debounce';
import BasicInfo from '@/components/PrivateComponents/BasicInfo';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import {
  BasicInformationInterface,
  ButtonType,
  ExtraActionItemInterface,
  PagePropsInterface,
} from '@/components/Interface';
import { ConnectState } from '@/models/connect';
import DB from '@/DB';
import styles from './index.less';

interface EditInfoInterface {
  isRecommend: number;
  labelIds: number[];
}

const basicInformation = {
  title: '作品信息',
  pictureLabel: '作品图片：',
  picSrc: '',
  contentArr: [
    {
      key: 'first',
      itemArr: [
        {
          label: '作品ID：',
          text: '',
        },
        {
          label: '作品标题：',
          text: '',
        },
        {
          label: '作品简介：',
          text: '',
        },
      ],
    },
    {
      key: 'second',
      itemArr: [
        {
          label: '作者昵称：',
          text: '',
        },
        {
          label: '创建时间：',
          text: '',
        },
        {
          label: '风格标签：',
          text: '',
        },
      ],
    },
    {
      key: 'third',
      itemArr: [
        {
          label: '编辑推荐：',
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

const ManageWorksDetail = (props: PagePropsInterface) => {
  const {
    query: { id },
  } = props.location;
  const page = 'manage_works_detail_comment';
  const { dispatch } = props;
  const extraSearchInfo = useMemo(() => ({ id }), [id]);
  const { detailsUrl, modifyUrl } = DB[page];
  const info = props.details ? props.details.info : {};

  const [updateDetailInfo, setUpdateDetailInfo] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditInfoInterface>({ isRecommend: 0, labelIds: [] });

  const [basicInfo, setBasicInfo] = useState<BasicInformationInterface>(basicInformation);

  useEffect(() => {
    dispatch({ type: 'global/getAllLabelList' });
  }, []);

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
  }, [updateDetailInfo]);

  useEffect(() => {
    const contentArr = [
      {
        key: 'first',
        itemArr: [
          {
            label: '作品ID：',
            text: info.id,
          },
          {
            label: '作品标题：',
            text: info.title,
          },
          {
            label: '作品简介：',
            text: info.describes,
          },
        ],
      },
      {
        key: 'second',
        itemArr: [
          {
            label: '作者昵称：',
            text: info.userName,
          },
          {
            label: '创建时间：',
            text: info.gmtCreate,
          },
          {
            label: '风格标签：',
            text: info.labelNames,
            wrap: true,
          },
        ],
      },
      {
        key: 'third',
        itemArr: [
          {
            label: '编辑推荐：',
            text: info.isRecommend === 1 ? '是' : '否',
          },
        ],
      },
    ];
    const newBasicInfo = {
      ...basicInformation,
      picSrc: info.imageUrls && info.imageUrls.length ? info.imageUrls[0] : '',
      contentArr,
    };
    setBasicInfo(newBasicInfo);
    const { isRecommend = 0, labelIds = [] } = info;
    setEditInfo({ isRecommend, labelIds });
  }, [props.details]);

  const onActionsHandle = (action: ExtraActionItemInterface) => {
    if (action.id === 'edit') {
      setModalVisible(true);
    }
  };

  const onConfirmEdit = async () => {
    if (editInfo.labelIds.length) {
      setModalLoading(true);
      const params = { id, ...editInfo };
      await dispatch({
        type: 'modify/modifyInfo',
        payload: { modifyUrl, params },
      });
      setModalVisible(false);
      setUpdateDetailInfo(!updateDetailInfo);
      setModalLoading(false);
    } else {
      notification.error({
        message: `请填写完整信息！`,
      });
    }
  };

  const onEditInfoChange = debounce(
    (key: string, value: number | number[]) =>
      setEditInfo((prevEditInfo: EditInfoInterface) => ({ ...prevEditInfo, [`${key}`]: value })),
    300,
  );

  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
        <hr />
        <BasicInfo basicInfo={basicInfo} onActionsHandle={onActionsHandle} />
        <hr />

        <div className={styles.basic_block}>
          <h3>作品属性</h3>
          <div className={styles.flexStartStart}>
            <div className={styles.col}>
              <div className={styles.basic_item}>
                <span className={styles.basic_label}>点赞次数：</span>
                {info.praiseNums || 0}
              </div>
              <div className={styles.basic_item}>
                <span className={styles.basic_label}>购买次数：</span>
                {info.buyNums || 0}
              </div>
              <div className={styles.basic_item}>
                <span className={styles.basic_label}>举报次数：</span>
                {info.reportNums || 0}
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.basic_item}>
                <span className={styles.basic_label}>参与活动：</span>
                {info.activityName || ''}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.basic_block}>
          <h3>评论</h3>
          <PageBasic page={page} hasSearchForm={false} extraSearchInfo={extraSearchInfo} />
        </div>

        <Modal
          title="编辑作品信息"
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
              <div className={styles.basic_label}>编辑推荐：</div>
              <Radio.Group
                defaultValue={info.isRecommend || 0}
                onChange={e => onEditInfoChange('isRecommend', e.target.value)}
              >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flexStartStart}>
              <div className={styles.basic_label}>风格标签：</div>
              <Checkbox.Group
                className={styles.style_tag}
                options={
                  props.global
                    ? props.global.allLabelList.map(label => ({
                        value: label.id,
                        label: label.name,
                      }))
                    : []
                }
                defaultValue={info.labelIds || []}
                onChange={checkedStyleTags => onEditInfoChange('labelIds', checkedStyleTags)}
              />
            </div>
          </Spin>
        </Modal>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ details, global }: ConnectState) => ({
  details,
  global,
}))(ManageWorksDetail);
