import { GlobalModelType } from '@/components/Interface';
import {
  addPushInfo,
  downloadCompositeImage,
  exportFundsList,
  getAllLabelList,
  getAllRoles,
  getBankInfo,
  getOrderRatio,
  getPersonAllAuthorizedMenu,
  getUserBalance,
  resetAccountPassword,
  updateOrderRatio,
  uploadFile,
} from '@/services/global';

const initState = {
  uploadFileUrl: '',
  collapsed: true,
  allRoleList: [],
  personAllAuthorizedMenu: [{ path: '', id: 0 }],
  allLabelList: [],
  orderRatio: {},
  bankInfo: {},
  userBalance: '0',
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initState,

  effects: {
    *uploadFile({ payload }, { call, put }) {
      const { data } = payload;
      const response = yield call(uploadFile, data);
      yield put({
        type: 'saveUploadFileUrl',
        payload: { ...response },
      });
    },
    *resetAccountPassword({ payload }, { call }) {
      const { id } = payload;
      yield call(resetAccountPassword, { id });
    },

    *getAllRoles(_, { call, put }) {
      const response = yield call(getAllRoles);
      yield put({
        type: 'saveAllRoles',
        payload: { ...response },
      });
    },
    *getPersonAllAuthorizedMenu({ payload }, { call, put }) {
      const { userId } = payload;
      const response = yield call(getPersonAllAuthorizedMenu, { userId });
      yield put({
        type: 'savePersonAllAuthorizedMenu',
        payload: { ...response },
      });
    },
    *getAllLabelList(_, { call, put }) {
      const response = yield call(getAllLabelList);
      yield put({
        type: 'saveAllLabelList',
        payload: { ...response },
      });
    },
    *getOrderRatio(_, { call, put }) {
      const response = yield call(getOrderRatio);
      yield put({
        type: 'saveOrderRatio',
        payload: { ...response },
      });
    },
    *updateOrderRatio({ payload }, { call }) {
      yield call(updateOrderRatio, { ...payload });
    },
    *addPushInfo({ payload }, { call }) {
      yield call(addPushInfo, { ...payload });
    },
    *exportFundsList({ payload }, { call }) {
      yield call(exportFundsList, { ...payload });
    },
    *downloadCompositeImage({ payload }, { call }) {
      yield call(downloadCompositeImage, { ...payload });
    },
    *getBankInfo({ payload }, { call, put }) {
      const response = yield call(getBankInfo, { ...payload });
      yield put({
        type: 'saveBankInfo',
        payload: { ...response },
      });
    },
    *getUserBalance({ payload }, { call, put }) {
      const response = yield call(getUserBalance, { ...payload });
      yield put({
        type: 'saveUserBalance',
        payload: { ...response },
      });
    },
  },

  // Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {
    changeLayoutCollapsed(state = initState, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveUploadFileUrl(state = initState, { payload }) {
      return {
        ...state,
        uploadFileUrl: payload.result,
      };
    },
    initUploadFileUrl(state = initState) {
      return {
        ...state,
        uploadFileUrl: '',
      };
    },
    saveAllRoles(state = initState, { payload }) {
      return {
        ...state,
        allRoleList: payload.result,
      };
    },

    savePersonAllAuthorizedMenu(state = initState, { payload }) {
      return {
        ...state,
        personAllAuthorizedMenu: payload.result,
      };
    },
    saveAllLabelList(state = initState, { payload }) {
      return {
        ...state,
        allLabelList: payload.result,
      };
    },
    saveOrderRatio(state = initState, { payload }) {
      return {
        ...state,
        orderRatio: payload.result,
      };
    },
    saveBankInfo(state = initState, { payload }) {
      return {
        ...state,
        bankInfo: payload.result || {},
      };
    },
    saveUserBalance(state = initState, { payload }) {
      return {
        ...state,
        userBalance: payload.result || 0,
      };
    },
  },
};

export default GlobalModel;
