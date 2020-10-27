import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { PagePropsInterface } from '@/components/Interface';
import styles from './index.less';
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

const Home = (props: PagePropsInterface) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    props.dispatch({ type: 'user/getHomeInfo' });
    setLoading(false);
  }, []);
  
 const getOption = () => {
    let option  =   {title: {
      text: '世界人口总量',
      subtext: '数据来自网络'
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
  },
  legend: {
      data: ['2011年', '2012年']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
  },
  yAxis: {
      type: 'category',
      data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
  },
  series: [
      // {
      //     name: '2011年',
      //     type: 'bar',
      //     data: [18203, 23489, 29034, 104970, 131744, 630230]
      // },
      {
          name: '2012年',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
  ]}
    return option
  }
  const getLineOption = () => {
    let option  =   {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
  };
    return option
  }
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
         <div className={styles.middleitem}>
          <ReactEcharts option={getOption()} />
         </div>
         <div className={styles.middleitem}>
          <ReactEcharts option={getOption()} />
         </div>
       </div>
       <div className={styles.footerwrap}>
          <ReactEcharts option={getLineOption()} />
       </div>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(Home);
