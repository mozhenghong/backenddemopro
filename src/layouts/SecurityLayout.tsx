import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/components/Interface';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const currentUser = JSON.parse(
      window.localStorage.getItem('currentUser') || JSON.stringify({}),
    );
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/saveCurrentUser',
        payload: currentUser,
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    const isLogin = currentUser && currentUser.token;
    const queryString = stringify({
      redirect: window.location.href,
    });

    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }
    // if (!isLogin) {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
