import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useCallback, useState } from 'react';
import { Modal, Spin, Input, DatePicker, Select, Radio, message, notification } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import { PagePropsInterface } from '@/components/Interface';
import { ConnectState } from '@/models/connect';

import styles from './index.less';

const { Option } = Select;
const { TextArea } = Input;

enum PushModalEnum {
  Add = 'add',
  Edit = 'edit',
}

const pushPersonTypeList = [
  { value: 0, label: '全部发送' },
  { value: 1, label: '单个用户' },
];
const messageTypeList = [
  { value: 0, label: '无' },
  { value: 1, label: '活动' },
  { value: 2, label: '外部链接' },
];

export interface pushInfoInterface {
  title: string;
  content: string;
  pushTime: string;
  pushPersonType: number;
  messageType: number;

  pushLink?: string;
  mobile?: string;
}

const initPushInfo = {
  title: '',
  content: '',
  pushTime: '',
  pushPersonType: 0,
  messageType: 0,
};

const Push = (props: PagePropsInterface) => {
  const page = 'push';

  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);
  const [pushInfo, setPushInfo] = useState<pushInfoInterface>({ ...initPushInfo });
  const [pushModalVisible, setPushModalVisible] = useState<boolean>(false);
  const [pushModalType, setPushModalType] = useState<PushModalEnum>(PushModalEnum.Add);

  const searchActionsHandle = useCallback(
    action => {
      if (action.key === 'add') {
        setPushInfo({ ...pushInfo, pushTime: moment().format('YYYY-MM-DD HH:mm:ss') });
        setPushModalType(PushModalEnum.Add);
        setPushModalVisible(true);
      }
    },
    [pushInfo],
  );

  const actionsHandle = useCallback((action, record) => {
    if (action.key === 'status') {
      setPushInfo(record);
      setPushModalType(PushModalEnum.Edit);
      setPushModalVisible(true);
    }
  }, []);

  const onPushModalCancel = useCallback(() => {
    setPushModalVisible(false);
    setPushInfo({ ...initPushInfo });
  }, []);

  const onPushModalConfirm = useCallback(async () => {
    if (
      Object.keys(pushInfo)
        .filter(key => typeof pushInfo[key] === 'string')
        .some(key => !pushInfo[key])
    ) {
      message.error('请填写完整信息！');
      return;
    }
    if (pushInfo.pushPersonType === 1 && !pushInfo.mobile) {
      message.error('请输入用户手机号！');
      return;
    }
    if (pushInfo.messageType !== 0 && !pushInfo.pushLink) {
      message.error('请输入相关连接！');
      return;
    }
    if (pushModalType === PushModalEnum.Add) {
      await props.dispatch({ type: 'global/addPushInfo', payload: { ...pushInfo } });
      notification.success({ message: '新增推送成功' });
    }
    if (pushModalType === PushModalEnum.Edit) {
      await props.dispatch({
        type: 'modify/modifyInfo',
        payload: { modifyUrl: '/platform/update', params: { ...pushInfo } },
      });
      notification.success({ message: '编辑推送成功' });
    }
    setPushModalVisible(false);
    setRefresh(!refresh);
  }, [pushInfo, refresh]);

  const onOperatePushInfo = useCallback(
    (type: string, updateValue: string | number) =>
      setPushInfo({
        ...pushInfo,
        [`${type}`]: updateValue,
      }),
    [pushInfo],
  );

  return (
    <PageHeaderWrapper className={styles.main}>
      <div style={{ textAlign: 'center' }}>
        <Spin spinning={loading} size="large">
          <PageBasic
            page={page}
            refresh={refresh}
            searchActionsHandle={searchActionsHandle}
            actionsHandle={actionsHandle}
          />

          <Modal
            title={pushModalType === PushModalEnum.Add ? '新增推送' : '编辑推送'}
            visible={pushModalVisible}
            onOk={onPushModalConfirm}
            onCancel={onPushModalCancel}
            destroyOnClose
            maskClosable={false}
            closable={false}
          >
            <div className={styles.push_item}>
              <div className={styles.label}>标题：</div>
              <Input
                placeholder="请填写标题"
                value={pushInfo.title}
                onChange={e => onOperatePushInfo('title', e.target.value)}
              />
            </div>
            <div className={styles.push_item}>
              <div className={styles.label}>内容：</div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                value={pushInfo.content}
                onChange={e => onOperatePushInfo('content', e.target.value)}
              />
            </div>
            <div className={styles.push_item}>
              <div className={styles.label}>发送时间：</div>
              <DatePicker
                showTime
                allowClear={false}
                placeholder="请选择发送时间"
                value={moment(pushInfo.pushTime)}
                onChange={(_, dateString) =>
                  onOperatePushInfo('pushTime', moment(dateString).format('YYYY-MM-DD HH:mm:ss'))
                }
              />
            </div>
            <div className={styles.push_item}>
              <div className={styles.label}>用户范围：</div>
              <Select
                value={pushInfo.pushPersonType}
                onChange={(value: number) => onOperatePushInfo('pushPersonType', value)}
              >
                {pushPersonTypeList.map(({ value, label }) => (
                  <Option value={value} key={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </div>
            {pushInfo.pushPersonType === 1 ? (
              <div className={styles.push_item}>
                <div className={styles.label}>用户手机号：</div>
                <Input
                  placeholder="请输入用户手机号"
                  value={pushInfo.mobile}
                  onChange={e => onOperatePushInfo('mobile', e.target.value)}
                />
              </div>
            ) : null}
            <div className={styles.push_item}>
              <div className={styles.label}>跳转：</div>
              <Radio.Group
                value={pushInfo.messageType}
                buttonStyle="solid"
                onChange={e => onOperatePushInfo('messageType', e.target.value)}
              >
                {messageTypeList.map(({ value, label }) => (
                  <Radio.Button value={value} key={value}>
                    {label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
            {pushInfo.messageType === 0 ? null : (
              <div className={styles.push_item}>
                <div className={styles.label}>
                  {pushInfo.messageType === 1 ? '活动ID' : '外部链接'}：
                </div>
                <Input
                  value={pushInfo.pushLink}
                  onChange={e => onOperatePushInfo('pushLink', e.target.value)}
                />
              </div>
            )}
          </Modal>
        </Spin>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ global }: ConnectState) => ({ global }))(React.memo(Push));
