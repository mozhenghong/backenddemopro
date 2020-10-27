import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect } from 'dva';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import styles from './index.less';

const ManageUser = () => {
  const page = 'manage_user';

  return (
    <PageHeaderWrapper className={styles.main}>
      <PageBasic page={page} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ManageUser);
