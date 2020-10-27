import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';

const ManageSystemCustomerFeedback = () => {
  const page = 'customer_feedback';

  return (
    <PageHeaderWrapper className={styles.main}>
      <PageBasic page={page} hasSearchForm={false} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageSystemCustomerFeedback);
