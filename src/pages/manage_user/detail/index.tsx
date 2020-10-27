import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo } from 'react';
import { Spin, Row, Col } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import BasicInfo from '@/components/PrivateComponents/BasicInfo';
import {
  BasicInformationInterface,
  PageInfoInterface,
  PagePropsInterface,
} from '@/components/Interface';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import DB from '@/DB';
import styles from './index.less';

const basicInformation = {
  title: '用户信息',
  pictureLabel: '头像：',
  picSrc: '',
  contentArr: [
    {
      key: 'first',
      labelLength: 6,
      itemArr: [
        {
          label: '用户ID：',
          text: '',
        },
        {
          label: '昵称：',
          text: '',
        },
        {
          label: '个人简介：',
          text: '',
        },
      ],
    },
    {
      key: 'second',
      labelLength: 8,
      itemArr: [
        {
          label: '用户手机号：',
          text: '',
        },
        {
          label: '创建时间：',
          text: '',
        },
        {
          label: '最后登录时间：',
          text: '',
        },
      ],
    },
    {
      key: 'third',
      labelLength: 8,
      itemArr: [
        {
          label: '用户微信绑定：',
          text: '',
        },
        {
          label: '用户微博绑定：',
          text: '',
        },
        {
          label: '喜爱的风格标签：',
          text: '',
        },
      ],
    },
  ],
};

const ManageUserDetail = (props: PagePropsInterface) => {
  const {
    query: { id },
  } = props.location;
  const page = 'manage_user';
  const { dispatch } = props;
  const { detailsUrl } = DB[page];
  const extraSearchInfo = useMemo(() => ({ userId: id }), [id]);
  const flowExtraSearchInfo = useMemo(() => ({ appUserId: id }), [id]);
  const pageInfoList = useMemo(
    () => [
      { name: 'manage_user_detail_account', title: '账户余额' },
      { name: 'manage_user_detail_follow', title: '关注用户' },
      { name: 'manage_user_detail_follower', title: '粉丝' },
    ],
    [],
  );
  const info = props.details ? props.details.info : {};
  const [loading, setLoading] = useState<boolean>(true);
  const [basicInfo, setBasicInfo] = useState<BasicInformationInterface>(basicInformation);

  useEffect(() => {
    const loadDetailInfo = () => {
      dispatch({
        type: 'details/getInfo',
        payload: { detailsUrl: detailsUrl.replace('{id}', id) },
      });
    };
    loadDetailInfo();
  }, []);

  useEffect(() => {
    const contentArr = [
      {
        key: 'first',
        labelLength: 6,
        itemArr: [
          {
            label: '用户ID：',
            text: info.id,
          },
          {
            label: '昵称：',
            text: info.nickName,
          },
          {
            label: '个人简介：',
            text: info.brief,
          },
        ],
      },
      {
        key: 'second',
        labelLength: 8,
        itemArr: [
          {
            label: '用户手机号：',
            text: info.mobile,
          },
          {
            label: '创建时间：',
            text: info.gmtCreate,
          },
          {
            label: '最后登录时间：',
            text: info.gmtModified,
          },
        ],
      },
      {
        key: 'third',
        labelLength: 8,
        itemArr: [
          {
            label: '用户微信绑定：',
            text: info.openId ? '已绑定' : '未绑定',
          },
          {
            label: '用户微博绑定：',
            text: info.xlId ? '已绑定' : '未绑定',
          },
          {
            label: '喜爱的风格标签：',
            text: info.styleTags,
          },
        ],
      },
    ];
    const newBasicInfo = { ...basicInformation, picSrc: info.headImageUrl, contentArr };
    setBasicInfo(newBasicInfo);
    setLoading(false);
  }, [props.details]);

  return (
    <PageHeaderWrapper className={styles.main}>
      <hr />
      <BasicInfo basicInfo={basicInfo} />
      <hr />
      <div className={styles.basic_block}>
        <h3>账户</h3>
        <Row className={styles.flex} gutter={24}>
          <Col>
            <span className={styles.basic_label}>持卡人姓名：</span>
            {info.cardholdersName}
          </Col>
          <Col>
            <span className={styles.basic_label}>开户银行：</span>
            {info.bankAccount}
          </Col>
          <Col>
            <span className={styles.basic_label}>银行卡号：</span>
            {info.bankCardNumber}
          </Col>
        </Row>
      </div>

      {pageInfoList.map((pageInfo: PageInfoInterface) => (
        <div className={styles.basic_block} key={pageInfo.name}>
          {pageInfo.name === 'manage_user_detail_account' ? (
            <div className={styles.flex}>
              <h3 style={{ marginBottom: '0' }}>{pageInfo.title}</h3>
              <div style={{ marginLeft: '16px' }}>¥ {info.accountBalance}</div>
            </div>
          ) : (
            <h3>{pageInfo.title}</h3>
          )}
          <PageBasic
            page={pageInfo.name}
            extraSearchInfo={
              pageInfo.name === 'manage_user_detail_account' ? flowExtraSearchInfo : extraSearchInfo
            }
            hasSearchForm={false}
          />
        </div>
      ))}

      <div style={{ textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ details }: ConnectState) => ({ details }))(ManageUserDetail);
