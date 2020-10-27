import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tabs, Modal, Input, notification, Select, Checkbox, Radio, Spin } from 'antd';
import { connect } from 'dva';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import {
  ActionInterface,
  ObjectInterface,
  PagePropsInterface,
  PersonAllAuthorizedMenuInterface,
} from '@/components/Interface';
import { ConnectState } from '@/models/connect';
import PageBasic from '@/components/PrivateComponents/pageBasic';
import DB from '@/DB';
import { infoIsValid } from '@/utils/utils';

import styles from './index.less';

const { TabPane } = Tabs;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const initAccountInfo = { userName: '', roleIds: '', islock: 0 };
const initRolesInfo = { name: '', menuIds: '' };

interface AccountInfoInterface {
  userName: string;
  roleIds: string;
  islock: number;
}

interface RolesInfoInterface {
  name: string;
  menuIds: string;

  [propsName: string]: string | number;
}

const ManageSystemAuthority = (props: PagePropsInterface) => {
  const userId = props.user ? props.user.currentUser.id : '';
  const { dispatch } = props;
  const allRoleList = props.global
    ? props.global.allRoleList.map((role: ObjectInterface) => ({
        ...role,
        label: role.name,
        value: role.id,
      }))
    : [];

  const personAllAuthorizedMenu = props.global
    ? props.global.personAllAuthorizedMenu.map(menu => ({
        label: menu.name,
        value: menu.id,
      }))
    : [];

  const [refresh, setRefresh] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [selectTab, setSelectTab] = useState<string>('authority_account_number');
  const [modalInfo, setModalInfo] = useState<ObjectInterface>({});
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [addAccountInfo, setAddAccountInfo] = useState<AccountInfoInterface>({
    ...initAccountInfo,
  });
  const [addRolesInfo, setAddRolesInfo] = useState<RolesInfoInterface>({ ...initRolesInfo });

  const tabList = useMemo(
    () => [
      {
        key: 'authority_account_number',
        title: '账号',
      },
      {
        key: 'authority_role',
        title: '角色',
        extraSearchInfo: { userId },
      },
    ],
    [userId],
  );

  useEffect(() => {
    dispatch({ type: 'global/getPersonAllAuthorizedMenu', payload: { userId } });
  }, [props.user]);

  useEffect(() => {
    if (selectTab === 'authority_account_number') {
      dispatch({ type: 'global/getAllRoles' });
    }
  }, [selectTab]);

  const closeModal = () => {
    setModalVisible(false);
    setIndeterminate(false);
    setCheckAll(false);
    setAddRolesInfo({ ...initRolesInfo });
    setAddAccountInfo({ ...initAccountInfo });
  };

  const onConfirmHandle = useCallback(async () => {
    const params = selectTab === 'authority_account_number' ? addAccountInfo : addRolesInfo;
    const urlField = modalInfo.title.indexOf('编辑') >= 0 ? 'modifyUrl' : 'addUrl';
    try {
      if (infoIsValid(params)) {
        setModalLoading(true);
        await dispatch({
          type: 'modify/modifyInfo',
          payload: { modifyUrl: DB[selectTab][`${urlField}`], params, paramsPosition: 'params' },
        });
        setRefresh(!refresh);
        setSelectTab(selectTab);
        closeModal();
      } else {
        notification.error({
          message: `请填写完整信息！`,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
    }
  }, [selectTab, addAccountInfo, addRolesInfo, refresh]);

  const onAddInfoChange = (key: string, value: string | number) =>
    modalInfo.key === 'authority_account_number'
      ? setAddAccountInfo((prevEditInfo: AccountInfoInterface) => ({
          ...prevEditInfo,
          [`${key}`]: value,
        }))
      : setAddRolesInfo((prevEditInfo: RolesInfoInterface) => ({
          ...prevEditInfo,
          [`${key}`]: value,
        }));

  const onCheckAllChange = (check: boolean) => {
    setIndeterminate(false);
    setCheckAll(check);
    onAddInfoChange(
      'menuIds',
      check ? personAllAuthorizedMenu.map(menu => menu.value).join(',') : '',
    );
  };

  const getSelectAuthorizedMenuIdListFn = useCallback(
    (menuList: PersonAllAuthorizedMenuInterface[]): Array<number> => {
      const SelectAuthorizedMenuIdList: Array<number> = [];
      menuList.forEach(menu => {
        if (menu.childList && menu.childList.length) {
          SelectAuthorizedMenuIdList.push(
            menu.id,
            ...getSelectAuthorizedMenuIdListFn(menu.childList),
          );
          return;
        }
        SelectAuthorizedMenuIdList.push(menu.id);
      });
      return SelectAuthorizedMenuIdList;
    },
    [],
  );

  const onCheckSingleChange = (checkedList: CheckboxValueType[]) => {
    const selectAuthorizedMenuList: PersonAllAuthorizedMenuInterface[] = props.global
      ? props.global.personAllAuthorizedMenu.filter(menu => checkedList.indexOf(menu.id) >= 0)
      : [];

    onAddInfoChange('menuIds', getSelectAuthorizedMenuIdListFn(selectAuthorizedMenuList).join(','));
    setIndeterminate(!!checkedList.length && checkedList.length < personAllAuthorizedMenu.length);
    setCheckAll(checkedList.length === personAllAuthorizedMenu.length);
  };

  const searchActionsHandleMemoized = useCallback(
    (action: ActionInterface) => {
      if (action.key === 'add') {
        if (selectTab === 'authority_account_number') {
          setModalInfo({ title: '新增账号', key: 'authority_account_number' });
        } else {
          setModalInfo({ title: '新增角色', key: 'authority_role' });
        }
        setModalVisible(true);
      }
    },
    [selectTab],
  );

  const actionsHandleMemoized = useCallback(
    async (action: ActionInterface, record: ObjectInterface) => {
      if (action.key === 'reset_password') {
        await dispatch({
          type: 'global/resetAccountPassword',
          payload: { id: record.id },
        });

        Modal.success({
          title: '该用户密码重置成功',
          content: <div>密码为：123456</div>,
        });
      }
      if (action.key === 'edit') {
        const { name, menuIds, id } = record;
        const selectMenuIdList = menuIds
          .slice(1, -1)
          .split(',')
          .filter((menuId: string) => Boolean(menuId))
          .map((menuId: string) => Number(menuId));
        const isCheckAll = personAllAuthorizedMenu.every(
          item => selectMenuIdList.indexOf(item.value) >= 0,
        );
        setIndeterminate(!isCheckAll);
        setCheckAll(isCheckAll);
        setAddRolesInfo({ name, menuIds: menuIds.slice(1, -1), id });
        setModalInfo({ title: '编辑角色', key: 'authority_role' });
        setModalVisible(true);
      }
    },
    [personAllAuthorizedMenu],
  );

  return (
    <PageHeaderWrapper className={styles.main}>
      <Tabs activeKey={selectTab} onChange={(key: string) => setSelectTab(key)}>
        {tabList.map(tab => (
          <TabPane tab={tab.title} key={tab.key}>
            <PageBasic
              page={tab.key}
              refresh={refresh}
              actionsHandle={actionsHandleMemoized}
              searchActionsHandle={searchActionsHandleMemoized}
              extraSearchInfo={tab.extraSearchInfo}
            />
          </TabPane>
        ))}
      </Tabs>

      <Modal
        title={modalInfo.title}
        visible={modalVisible}
        key={modalInfo.key}
        onOk={onConfirmHandle}
        onCancel={closeModal}
        destroyOnClose
        maskClosable={false}
        closable={false}
        okButtonProps={{ disabled: modalLoading }}
        cancelButtonProps={{ disabled: modalLoading }}
      >
        <Spin spinning={modalLoading} size="large">
          {modalInfo.key === 'authority_account_number' ? (
            <div className={styles.flex}>
              <div className={styles.label}>账户名：</div>
              <Input onChange={e => onAddInfoChange('userName', e.target.value)} />
            </div>
          ) : (
            <div className={styles.flex}>
              <div className={styles.label}>角色名称：</div>
              <Input
                value={addRolesInfo.name}
                onChange={e => onAddInfoChange('name', e.target.value)}
              />
            </div>
          )}
          <div className={styles.basic_block} />
          {modalInfo.key === 'authority_account_number' ? (
            <div className={styles.flex}>
              <div className={styles.label}>角色：</div>
              <Select
                style={{ width: 120 }}
                onChange={(value: string) => onAddInfoChange('roleIds', value)}
              >
                {allRoleList.map((role: ObjectInterface) => (
                  <Option value={role.id} key={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </div>
          ) : (
            <div className={styles.flexStartStart}>
              <div className={styles.label}>配置权限：</div>
              <div className={styles.check_wrapper}>
                <Checkbox
                  className={styles.check_all}
                  indeterminate={indeterminate}
                  onChange={e => onCheckAllChange(e.target.checked)}
                  checked={checkAll}
                >
                  全选
                </Checkbox>
                <CheckboxGroup
                  className={styles.check_single}
                  options={personAllAuthorizedMenu}
                  value={addRolesInfo.menuIds
                    .split(',')
                    .filter(menuId => Boolean(menuId))
                    .map(menuId => Number(menuId))}
                  onChange={checkedList => onCheckSingleChange(checkedList)}
                />
              </div>
            </div>
          )}
          <div className={styles.basic_block} />
          {modalInfo.key === 'authority_account_number' ? (
            <div className={styles.flex}>
              <div className={styles.label}>状态：</div>
              <Radio.Group
                onChange={e => onAddInfoChange('islock', e.target.value)}
                defaultValue={0}
              >
                <Radio value={1}>上架</Radio>
                <Radio value={0}>下架</Radio>
              </Radio.Group>
            </div>
          ) : null}
        </Spin>
      </Modal>
    </PageHeaderWrapper>
  );
};
export default connect(({ user, global }: ConnectState) => ({
  user,
  global,
}))(React.memo(ManageSystemAuthority));
