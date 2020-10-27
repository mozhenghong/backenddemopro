import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { PagePropsInterface } from '@/components/Interface';
import styles from './index.less';

const Home = (props: PagePropsInterface) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    props.dispatch({ type: 'user/getHomeInfo' });
    setLoading(false);
  }, []);

  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
       <div className={styles.topwrap}>
          <div className={styles.itemwrap}>
            <div className={styles.itemtitle}>今日营收金额</div>
            <div className={styles.itemaccount}>12358.00</div>
            <div>昨日营收金额</div>
            <div>452.00</div>
          </div>
          <div className={styles.itemwrap}>
            <div className={styles.itemtitle}>今日订单数量</div>
            <div className={styles.itemaccount}>12358.00</div>
            <div>昨日订单数量</div>
            <div>452.00</div>
          </div>
          <div className={styles.itemwrap}>
            <div className={styles.itemtitle}>今日客户数量</div>
            <div className={styles.itemaccount}>12358.00</div>
            <div>昨日客户数量</div>
            <div>452.00</div>
          </div>
          <div className={styles.itemwrap}>
            <div className={styles.itemtitle}>采样点数</div>
            <div className={styles.itemaccount}>12358.00</div>
          </div>
       </div>
       <div className={styles.middlewrap}>
         <div className={styles.middleitem}>11</div>
         <div className={styles.middleitem}>22</div>
       </div>
       <div className={styles.footerwrap}>3333</div>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(Home);
