import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';
import { PagePropsInterface } from '@/components/Interface';
import { ConnectState } from '@/models/connect';

const page = 'manage_funds_detail';

const ManageFundsDetail = (props: PagePropsInterface) => {
  const {
    query: { userId, payDate },
  } = props.location;

  const extraSearchInfo = useMemo(() => ({ userId, payDate }), []);

  useEffect(() => {
    const loadData = async () => {
      props.dispatch({ type: 'global/getUserBalance', payload: { userId } });
      props.dispatch({ type: 'global/getBankInfo', payload: { userId } });
    };
    loadData();
  }, []);
  return (
    <PageHeaderWrapper className={styles.main}>
      <div className={styles.title}>账户</div>
      <div className={styles.flex}>
        <div className={styles.label}>持卡人姓名：</div>
        <div className={styles.value}>{props.global?.bankInfo.realName || 'null'}</div>
        <div className={styles.label}>开户银行：</div>
        <div className={styles.value}>{props.global?.bankInfo.bankName || 'null'}</div>
        <div className={styles.label}>银行卡号：</div>
        <div className={styles.value}>{props.global?.bankInfo.cardNo || 'null'}</div>
      </div>
      <div className={styles.flex}>
        <div className={styles.title}>账户余额：</div>
        <div>￥{props.global?.userBalance}</div>
      </div>
      <PageBasic page={page} hasSearchForm={false} extraSearchInfo={extraSearchInfo} />
    </PageHeaderWrapper>
  );
};

export default connect(({ global }: ConnectState) => ({ global }))(ManageFundsDetail);
