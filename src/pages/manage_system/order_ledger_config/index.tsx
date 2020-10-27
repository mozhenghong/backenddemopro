import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useCallback } from 'react';
import { Spin, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import { PagePropsInterface } from '@/components/Interface';
import { ConnectState } from '@/models/connect';
import styles from './index.less';

const controlList = [
  {
    label: '平台比例：',
    key: 'platform_ratio',
  },
  {
    label: '用户比例：',
    key: 'user_ratio',
  },
];

const OrderLedgerConfig = (props: PagePropsInterface) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [platformRatio, setPlatformRatio] = useState<number>(0);
  const [userRatio, setUserRatio] = useState<number>(0);

  useEffect(() => {
    const init = async () => {
      await props.dispatch({ type: 'global/getOrderRatio' });
      setLoading(false);
    };
    init();
  }, [refresh]);

  useEffect(() => {
    if (props.global && props.global.orderRatio) {
      setPlatformRatio(props.global.orderRatio.platFromRadio || 0);
      setUserRatio(props.global.orderRatio.radio || 0);
    }
  }, [props.global?.orderRatio]);

  const onChange = useCallback((value, record) => {
    if (record.key === 'platform_ratio') {
      setPlatformRatio(value);
    } else {
      setUserRatio(value);
    }
  }, []);

  const updateOrderRatio = useCallback(async () => {
    await props.dispatch({
      type: 'global/updateOrderRatio',
      payload: { userRatio, platformRatio },
    });
    setRefresh(!refresh);
  }, [userRatio, platformRatio, refresh]);

  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
        {controlList.map(item => (
          <div key={item.key} className={styles.control}>
            <div>{item.label}</div>
            <InputNumber
              className={styles.control_input}
              value={item.key === 'platform_ratio' ? platformRatio : userRatio}
              placeholder="请输入数字"
              onChange={value => onChange(value, item)}
              style={{ width: '160px' }}
            />
            <div>%</div>
          </div>
        ))}
        <Button type="primary" onClick={updateOrderRatio}>
          保存
        </Button>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ global }: ConnectState) => ({ global }))(React.memo(OrderLedgerConfig));
