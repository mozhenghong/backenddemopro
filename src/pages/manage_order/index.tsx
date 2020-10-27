import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import { Modal, Radio } from 'antd';
import { ActionInterface, ObjectInterface, PagePropsInterface } from '@/components/Interface';
import PageBasic from '@/components/PrivateComponents/pageBasic';

import styles from './index.less';

const orderStatusMap = {
  0: '待支付',
  1: '已支付',
  2: '已取消',
  3: '已退款',
  4: '待制作',
  5: '制作中',
  6: '待发货',
  7: '待收货',
  8: '待退货',
  9: '待头脑收货',
  10: '已完成',
};

const updateOrderStatusActionMap = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [
    { title: '开始制作', status: 5 },
    { title: '发起退款', status: 3 },
  ],
  5: [
    { title: '制作完成', status: 6 },
    { title: '发起退款', status: 3 },
  ],
  6: [
    { title: '已发货', status: 7 },
    { title: '发起退款', status: 3 },
  ],
  7: [
    { title: '已完成', status: 10 },
    { title: '发起退款', status: 8 },
  ],
  8: [{ title: '已完成', status: 10 }],
  9: [{ title: '确认收货', status: 3 }],
  10: [{ title: '发起退款', status: 8 }],
};

const refundInformationList = [
  { title: '退款状态：', key: 'status' },
  { title: '退款单号：', key: 'refundNo' },
  { title: '退货原因：', key: 'reason' },
  { title: '物流公司：', key: 'logisticsCompany' },
  { title: '物流单号：', key: 'logisticsNo' },
];

const ManageOrder = (props: PagePropsInterface) => {
  const page = 'manage_order';
  const { dispatch } = props;

  const [refresh, setRefresh] = useState<boolean>(false);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] = useState<boolean>(false);
  const [refundInformationModalVisible, setRefundInformationModalVisible] = useState<boolean>(
    false,
  );
  const [updateOrderInfo, setUpdateOrderInfo] = useState<{ orderNo: string; status: number }>({
    orderNo: '',
    status: 0,
  });
  const [updateOrderStatusActionList, setUpdateOrderStatusActionList] = useState<
    { title: string; status: number }[]
  >([]);
  const [refundInformation, setRefundInformation] = useState<ObjectInterface>({});

  const actionsHandle = (action: ActionInterface, record: ObjectInterface) => {
    const { orderNo, status } = record;
    if (action.key === 'update_status') {
      setUpdateOrderInfo({ orderNo, status });
      setUpdateOrderStatusActionList(updateOrderStatusActionMap[status]);
      setUpdateStatusModalVisible(true);
    }
    if (action.key === 'status') {
      // 退款信息
      setRefundInformationModalVisible(true);
      setRefundInformation(record);
    }
    if (action.key === 'download') {
      dispatch({
        type: 'global/downloadCompositeImage',
        payload: { orderNo: record.orderNo },
      });
    }
  };

  const onUpdateStatusCancel = useCallback(() => {
    setUpdateOrderInfo({ orderNo: '', status: 0 });
    setUpdateStatusModalVisible(false);
    setUpdateOrderStatusActionList([]);
  }, []);

  const onUpdateStatusConfirm = useCallback(async () => {
    await dispatch({
      type: 'modify/modifyInfo',
      payload: {
        modifyUrl: '/order/modify',
        params: updateOrderInfo,
        paramsPosition: 'data',
      },
    });
    onUpdateStatusCancel();
    setRefresh(!refresh);
  }, [updateOrderInfo, refresh]);

  const onOrderStatusChange = useCallback(
    e => {
      setUpdateOrderInfo({ orderNo: updateOrderInfo.orderNo, status: e.target.value });
    },
    [updateOrderInfo],
  );

  const closeRefundInformationModal = useCallback(
    () => setRefundInformationModalVisible(false),
    [],
  );

  return (
    <PageHeaderWrapper className={styles.main}>
      <PageBasic page={page} refresh={refresh} actionsHandle={actionsHandle} />

      <Modal
        title="更新状态"
        visible={updateStatusModalVisible}
        onOk={onUpdateStatusConfirm}
        onCancel={onUpdateStatusCancel}
      >
        <div className={styles.flex}>
          <div className={styles.label}>订单状态:</div>
          <Radio.Group onChange={onOrderStatusChange} value={updateOrderInfo.status}>
            {updateOrderStatusActionList.map(({ status, title }) => (
              <Radio value={status} key={status}>
                {title}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </Modal>

      <Modal
        title="更新状态"
        closable={false}
        visible={refundInformationModalVisible}
        onOk={closeRefundInformationModal}
        onCancel={closeRefundInformationModal}
      >
        {refundInformationList.map(item => (
          <div className={styles.row} key={item.key}>
            <div className={styles.label}>{item.title}</div>
            <div>
              {item.key === 'status'
                ? orderStatusMap[refundInformation.status]
                : refundInformation[item.key]}
            </div>
          </div>
        ))}
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageOrder);
