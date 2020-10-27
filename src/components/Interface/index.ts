import { Effect } from 'dva';
import { Dispatch, Reducer } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { PaginationConfig } from 'antd/lib/pagination';

export enum ButtonType {
  Primary = 'primary',
  Link = 'link',
  Default = 'default',
  Ghost = 'ghost',
  Dashed = 'dashed',
  Danger = 'danger',
}

export interface ExtraActionItemInterface {
  type: ButtonType;
  text: string;
  id: string;
}

export interface BasicInformationInterface {
  title: string;
  pictureLabel: string;
  picSrc?: string;
  contentArr: Array<any>;
  extraActions?: Array<ExtraActionItemInterface>;
}

export interface ItemInterface {
  label: string;
  text: string;
  wrap?: boolean;
}

export interface ExtraInfoInfoInterface {
  title: object | string;
}

export interface ActionInterface {
  key: string;
  text?: string;
  route?: string;
  status?: object;
  depend?: string;
  type?: ButtonType | string;
  extraInfo?: ExtraInfoInfoInterface;
  exchangeStatusUrl?: string;
  exchangeStatusKey?: string;
  exchangeStatusParamsPosition?: string;
  exchangeStatusParamsKeyObj?: object;
  exchangeStatusObj?: object;
}

export interface PageSearchInfoInterface {
  pageNum: number;
  pageSize: number;
  [propsName: string]: number | string;
}

export interface PropsInterface {
  page: string;
  pagination?: PaginationConfig | false | true;
  total?: number;
  dataSource?: Array<any>;
  actionsHandle?: (action: ActionInterface, searchInfo: object, record?: any) => void;
  pageChangeHandle?: (currentPage: number, pageSize: number | undefined) => void;
}

export interface LoginParamsType {
  userName: string;
  password: string;
}

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface CurrentUser {
  token: string;
  userName: string;
  userId: string;
  id: string;

  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  unreadCount?: number;
}

export interface HomeInfo {
  userCount: number;
  orderCount: number;
  opusCount: number;
}

export interface UserModelState {
  currentUser: CurrentUser;
  status: StateType;
  userPermissionsMenu: MenuDataItem[];
  homeInfo?: HomeInfo;
}

export interface ObjectInterface {
  [propsName: string]: any;
}

export interface TableListModelState {
  manage_commodity_total?: number;
  manage_commodity_detail_attributes_total?: number;
  manage_order_total?: number;
  manage_user_total?: number;
  manage_user_detail_account_total?: number;
  manage_user_detail_follow_total?: number;
  manage_user_detail_follower_total?: number;
  manage_works_total?: number;
  manage_works_detail_comment_total?: number;
  manage_funds_total?: number;
  manage_operation_banner_total?: number;
  manage_operation_activity_total?: number;
  report_total_total?: number;
  order_ledger_config_total?: number;
  push_total?: number;
  customer_feedback_total?: number;
  recommend_config_total?: number;
  style_tags_total?: number;
  authority_account_number_total?: number;
  authority_role_total?: number;

  manage_commodity_list?: Array<any>;
  manage_commodity_detail_attributes_list?: ObjectInterface;
  manage_order_list?: Array<any>;
  manage_user_list?: Array<any>;
  manage_user_detail_account_list?: Array<any>;
  manage_user_detail_follow_list?: Array<any>;
  manage_user_detail_follower_list?: Array<any>;
  manage_works_list?: Array<any>;
  manage_works_detail_comment_list?: Array<any>;
  manage_funds_list?: Array<any>;
  manage_operation_banner_list?: Array<any>;
  manage_operation_activity_list?: Array<any>;
  report_list_list?: Array<any>;
  order_ledger_config_list?: Array<any>;
  push_list?: Array<any>;
  customer_feedback_list?: Array<any>;
  recommend_config_list?: Array<any>;
  style_tags_list?: Array<any>;
  authority_account_number_list?: Array<any>;
  authority_role_list?: Array<any>;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    getHomeInfo: Effect;
    getUserPermissionsMenu: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    saveHomeInfo: Reducer<UserModelState>;
    changeLoginStatus: Reducer<StateType>;
    saveUserPermissionsMenu: Reducer<UserModelState>;
  };
  subscriptions?: object;
}

export interface TableListModelType {
  namespace: 'tableList';
  state: TableListModelState;
  effects: {
    getTableList: Effect;
    exchangeTableItemActionStatus: Effect;
  };
  reducers: {
    saveTableList: Reducer<TableListModelState>;
  };
  subscriptions?: object;
}

export interface getUserPermissionsMenuParams {
  userId: string;
}

export interface CommodityDetailInterface {
  goodsDetailList: Array<any>;
}

export interface PagePropsInterface {
  dispatch: Dispatch;
  tableList?: TableListModelState;
  detailInfo?: CommodityDetailInterface;
  user?: UserModelState;
  details?: DetailsModelState;
  global?: GlobalModelState;
  location: { query: { id: string; gid: string; userId: string; payDate: string } };
}

export interface UploadFilePropInterface extends PagePropsInterface {
  uploadSuccess: (url: string) => void;
  isInit: boolean;
  defaultValue?: string;
  global: GlobalModelState;
}

export interface ExchangeTableItemActionStatusInterface {}

export interface PageInfoInterface {
  name: string;
  title: string;
}

export interface PageBasicPropsInterface {
  page: string;
  tableList: TableListModelState;
  hasSearchForm?: boolean;
  extraSearchInfo?: object;
  actionsHandle?: (action: ActionInterface, record: any) => void;
  searchActionsHandle?: (action: ActionInterface, searchInformation: object) => void;
  refresh?: Boolean;
  dispatch: Dispatch;
}

export interface TableColumnInterface {
  title: string;
  dataIndex: string;
  key: string;
  type?: string;
  default?: Array<string>;
  render?: (text: any, record: any, index: number) => void;
  needRender?: boolean;
  enumerate?: object;
  renderDepend?: Array<string>;
}

export interface DetailsModelState {
  info: ObjectInterface;
}

export interface DetailsModelType {
  namespace: 'details';
  state: DetailsModelState;
  effects: {
    getInfo: Effect;
  };
  reducers: {
    saveInfo: Reducer<DetailsModelState>;
  };
  subscriptions?: object;
}

export interface ModifyModelState {}

export interface ModifyModelType {
  namespace: 'modify';
  state: ModifyModelState;
  effects: {
    modifyInfo: Effect;
  };
  reducers: {};
  subscriptions?: object;
}

export interface PersonAllAuthorizedMenuInterface extends MenuDataItem {
  id: number;
}

export interface GlobalModelState {
  uploadFileUrl: string;
  collapsed: boolean;
  allRoleList: Array<ObjectInterface>;
  personAllAuthorizedMenu: PersonAllAuthorizedMenuInterface[];
  allLabelList: Array<ObjectInterface>;
  orderRatio: ObjectInterface;
  bankInfo: ObjectInterface;
  userBalance: string;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    uploadFile: Effect;
    resetAccountPassword: Effect;
    getAllRoles: Effect;
    getPersonAllAuthorizedMenu: Effect;
    getAllLabelList: Effect;
    getOrderRatio: Effect;
    updateOrderRatio: Effect;
    addPushInfo: Effect;
    exportFundsList: Effect;
    getBankInfo: Effect;
    getUserBalance: Effect;
    downloadCompositeImage: Effect;
  };
  reducers: {
    saveUploadFileUrl: Reducer<GlobalModelState>;
    initUploadFileUrl: Reducer<GlobalModelState>;
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveAllRoles: Reducer<GlobalModelState>;
    savePersonAllAuthorizedMenu: Reducer<GlobalModelState>;
    saveAllLabelList: Reducer<GlobalModelState>;
    saveOrderRatio: Reducer<GlobalModelState>;
    saveBankInfo: Reducer<GlobalModelState>;
    saveUserBalance: Reducer<GlobalModelState>;
  };
}

export interface RichTextEditorPropsInterface {
  title: string;
  htmlContent: string;
  saveEditorContentHandle: (htmlContent: string) => void;
}

export interface ZoomPicturePropsInterface {
  pictureSrc: string;
  onCancelHandle?: () => void;
}
