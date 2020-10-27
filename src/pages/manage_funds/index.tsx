import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import { getValidSearchInfo } from '@/utils/utils';
import { ActionInterface, PagePropsInterface } from '@/components/Interface';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';

const { confirm } = Modal;
const page = 'manage_funds';

const ManageFunds = (props: PagePropsInterface) => {
  const searchActionsHandle = useCallback((action: ActionInterface, searchInformation: object) => {
    if (action.key === 'bulk_settlement') {
      confirm({
        title: '你确定要批量结算么？操作后无法撤回',
        onOk() {
          // console.log('OK');
        },
      });
    }
    if (action.key === 'export') {
      props.dispatch({
        type: 'global/exportFundsList',
        payload: { ...getValidSearchInfo(searchInformation) },
      });
    }
  }, []);

  return (
    <PageHeaderWrapper className={styles.main}>
      <PageBasic page={page} searchActionsHandle={searchActionsHandle} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageFunds);
