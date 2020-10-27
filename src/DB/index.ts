// import moment from 'moment';
import { getDayStr, getLastMonthStr } from '@/utils/utils';

const lastDayStr = getDayStr(-1);
const pageObj = {
  basePageNum: 1,
  basePageSize: 10,
};

export default {
  manage_commodity: {
    requestUrl: '/goods/getList',
    searchInfo: {},
    tableInfo: {
      columnList: [
        {
          title: '商品ID',
          dataIndex: 'gid',
          key: 'gid',
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          key: 'goodsName',
        },
        {
          title: '状态',
          dataIndex: 'isDelete',
          key: 'isDelete',
          needRender: true,
          enumerate: {
            0: '上架',
            1: '下架',
          },
        },
        {
          title: '更新时间',
          dataIndex: 'mofityTime',
          key: 'mofityTime',
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isDelete',
          type: 'popconfirm',
          exchangeStatusUrl: '/goods/modifyGoodsRecord',
          exchangeStatusParamsKeyObj: { gid: 'gid', isDelete: 'isDelete' },
          exchangeStatusKey: 'isDelete',
          exchangeStatusParamsPosition: 'data',
          extraInfo: {
            title: {
              0: '你确定要下架该商品么？',
              1: '你确定要上架该商品么？',
            },
          },
          status: {
            0: '下架',
            1: '上架',
          },
        },
        {
          route: '/manage_commodity/detail',
          key: 'detail',
        },
      ],
    },
    ...pageObj,
  },
  manage_commodity_detail_attributes: {
    modifyCommodityAttributesUrl: '/goods/modifyGoodsDetail',
    modifyUrl: '/goods/modifyGoodsRecord',
    requestUrl: '/goods/getById',
    listKey: 'goodsDetailList',
    tableInfo: {
      columnList: [
        {
          title: '大小',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '颜色',
          dataIndex: 'colour',
          key: 'colour',
        },
        {
          title: '库存',
          dataIndex: 'nums',
          key: 'nums',
        },
        {
          title: '状态',
          dataIndex: 'isOnline',
          key: 'isOnline',
          needRender: true,
          enumerate: {
            0: '下架',
            1: '上架',
          },
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isOnline',
          type: 'popconfirm',
          extraInfo: {
            title: {
              0: '你确定要上架该商品属性么？',
              1: '你确定要下架该商品属性么？',
            },
          },
          status: {
            0: '上架',
            1: '下架',
          },
        },
        {
          key: 'edit',
          text: '编辑',
        },
      ],
    },
    ...pageObj,
  },
  manage_order: {
    requestUrl: '/order/getOrderList',
    searchInfo: {
      searchList: [
        {
          type: 'input',
          label: '订单编号',
          key: 'orderNo',
        },
        {
          type: 'select',
          label: '订单状态',
          key: 'status',
          optionList: [
            {
              value: '0',
              label: '待付款',
            },
            {
              value: '6',
              label: '待发货',
            },
            {
              value: '7',
              label: '待收货',
            },
            {
              value: '4',
              label: '待制作',
            },
            {
              value: '1',
              label: '已完成',
            },
            {
              value: '5',
              label: '制作中',
            },
            {
              value: '2',
              label: '已取消',
            },
            {
              value: '8',
              label: '待退货',
            },
            {
              value: '9',
              label: '待头脑收货',
            },
            {
              value: '3',
              label: '已退款',
            },
          ],
        },
        {
          type: 'input',
          label: '购买用户手机号',
          key: 'mobile',
        },
        {
          type: 'rangePicker',
          label: '选择创建日期',
          key: 'order_create_time',
          default: [lastDayStr, lastDayStr],
        },
      ],
      searchActions: [
        {
          text: '查询',
          type: 'primary',
          key: 'search',
        },
        {
          text: '导出',
          type: 'primary',
          key: 'export',
        },
      ],
    },
    tableInfo: {
      scroll: {
        x: 'max-content',
      },
      actionFixed: 'right',
      columnList: [
        {
          fixed: true,
          title: '订单编号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          fixed: true,
          title: '购买用户',
          dataIndex: 'userMobile',
          key: 'userMobile',
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          key: 'goodsName',
        },
        {
          title: '作品名称',
          dataIndex: 'showName',
          key: 'showName',
        },
        {
          title: '订单金额',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: '支付方式',
          dataIndex: 'payType',
          key: 'payType',
          needRender: true,
          enumerate: {
            1: '微信',
            2: '支付宝',
          },
        },
        {
          title: '订单数量',
          dataIndex: 'goodsNum',
          key: 'goodsNum',
        },
        {
          title: '商品大小',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '商品颜色',
          dataIndex: 'colour',
          key: 'colour',
        },
        {
          title: '收货地址',
          dataIndex:
            'goodsReceiveAddress/name&goodsReceiveAddress/mobile&goodsReceiveAddress/address&goodsReceiveAddress/detailAddr',
          key:
            'goodsReceiveAddress/name&goodsReceiveAddress/mobile&goodsReceiveAddress/address&goodsReceiveAddress/detailAddr',
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          key: 'status',
          needRender: true,
          enumerate: {
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
          },
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
        {
          title: '更新时间',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
        },
      ],
      actionList: [
        {
          key: 'download',
          text: '下载合成图',
        },
        {
          key: 'update_status',
          depend: 'status',
          status: {
            1: '更新状态',
            4: '更新状态',
            5: '更新状态',
            6: '更新状态',
            7: '更新状态',
            8: '更新状态',
            9: '更新状态',
            10: '更新状态',
          },
        },
        {
          key: 'status',
          depend: 'status',
          status: {
            3: '退款信息',
            8: '退款信息',
          },
        },
      ],
    },
    ...pageObj,
  },
  manage_user: {
    detailsUrl: '/app/user/{id}',
    requestUrl: '/app/user/getList',
    searchInfo: {
      searchList: [
        {
          type: 'input',
          label: '项目简称',
          key: 'name',
        },
        {
          type: 'input',
          label: '项目编码',
          key: 'code',
        },
        {
          type: 'select',
          label: '区域',
          key: 'range',
          optionList: [
            {
              value: '1',
              label: '上架',
            },
            {
              value: '0',
              label: '下架',
            },
          ],
        },
        {
          type: 'select',
          label: '品牌',
          key: 'brand',
          optionList: [
            {
              value: '1',
              label: '上架',
            },
            {
              value: '0',
              label: '下架',
            },
          ],
        },
        // {
        //   type: 'rangePicker',
        //   label: '选择创建日期',
        //   key: 'create_time',
        // },
      ],
      searchActions: [
        {
          text: '重置',
          type: '',
          key: 'reset',
        },
        {
          text: '查询',
          type: 'primary',
          key: 'search',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '项目编码',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '价格区域',
          dataIndex: 'nickName',
          key: 'nickName',
        },
        {
          title: '项目简称',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '检测意义',
          dataIndex: 'brief',
          key: 'brief',
        },
        {
          title: '性别',
          dataIndex: 'islock',
          key: 'islock',
          needRender: true,
          enumerate: {
            0: '启用',
            1: '停用',
          },
        },
        {
          title: '套餐类型',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '售卖价',
          dataIndex: 'nickName',
          key: 'nickName',
        },
        {
          title: '品牌',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '品牌项目名',
          dataIndex: 'brief',
          key: 'brief',
        },
        {
          title: '采样提成',
          dataIndex: 'brief',
          key: 'brief',
        },
        {
          title: '添加时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
        {
          title: '修改时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
        {
          title: '状态',
          dataIndex: 'islock',
          key: 'islock',
          needRender: true,
          enumerate: {
            0: '启用',
            1: '停用',
          },
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'islock',
          type: 'popconfirm',
          exchangeStatusUrl: '/app/user/lockUnlock',
          exchangeStatusParamsKeyObj: { appUserId: 'id', islock: 'islock' },
          exchangeStatusKey: 'islock',
          extraInfo: {
            title: {
              0: '你确定要停用该用户么？',
              1: '你确定要启用该用户么',
            },
          },
          status: {
            0: '停用',
            1: '启用',
          },
        },
        {
          route: '/manage_user/detail',
          key: 'detail',
        },
      ],
    },
    ...pageObj,
  },
  manage_user_detail_account: {
    requestUrl: '/app/user/getFlowList',
    tableInfo: {
      columnList: [
        {
          title: '流水类型',
          dataIndex: 'refType',
          key: 'refType',
          needRender: true,
          enumerate: {
            1: '购买作品',
          },
        },
        {
          title: '订单号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          title: '流水号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          title: '流水金额',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: '流水时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [],
    },
    ...pageObj,
  },
  manage_user_detail_follow: {
    requestUrl: '/concern/getMyConcern',
    tableInfo: {
      columnList: [
        {
          title: '用户ID',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
          title: '用户昵称',
          dataIndex: 'nickName',
          key: 'nickName',
        },
        {
          title: '用户简介',
          dataIndex: 'brief',
          key: 'brief',
        },
        {
          title: '关注状态',
          dataIndex: 'concerType',
          key: 'concerType',
          needRender: true,
          enumerate: {
            0: '未关注',
            1: '已关注',
            2: '相互关注',
          },
        },
        {
          title: '关注时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [],
    },
    ...pageObj,
  },
  manage_user_detail_follower: {
    requestUrl: '/concern/getMyFuns',
    tableInfo: {
      columnList: [
        {
          title: '用户ID',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
          title: '用户昵称',
          dataIndex: 'nickName',
          key: 'nickName',
        },
        {
          title: '用户简介',
          dataIndex: 'brief',
          key: 'brief',
        },
        {
          title: '关注状态',
          dataIndex: 'concerType',
          key: 'concerType',
          needRender: true,
          enumerate: {
            0: '未关注',
            1: '已关注',
            2: '相互关注',
          },
        },
        {
          title: '关注时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [],
    },
    ...pageObj,
  },
  manage_works: {
    requestUrl: '/pus/getList',
    searchInfo: {
      searchList: [
        {
          type: 'input',
          label: '作者手机号',
          key: 'mobile',
        },
        {
          type: 'select',
          label: '状态',
          key: 'isOnline',
          optionList: [
            {
              value: '1',
              label: '上架',
            },
            {
              value: '0',
              label: '下架',
            },
          ],
        },
        {
          type: 'select',
          label: '编辑推荐',
          key: 'isRecommend',
          optionList: [
            {
              value: 1,
              label: '是',
            },
            {
              value: 0,
              label: '否',
            },
          ],
        },
        {
          type: 'input',
          label: '作品标题',
          key: 'title',
        },
        {
          type: 'rangePicker',
          label: '选择创建日期',
          key: 'create_time',
        },
      ],
      searchActions: [
        {
          text: '查询',
          type: 'primary',
          key: 'search',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '作品ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '作品标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '作者手机号',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '作品标签',
          dataIndex: 'labelNames',
          key: 'labelNames',
        },
        {
          title: '编辑推荐',
          dataIndex: 'isRecommend',
          key: 'isRecommend',
          needRender: true,
          enumerate: {
            0: '否',
            1: '是',
          },
        },
        {
          title: '状态',
          dataIndex: 'isOnline',
          key: 'isOnline',
          needRender: true,
          enumerate: {
            0: '下架',
            1: '上架',
          },
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isOnline',
          type: 'popconfirm',
          exchangeStatusUrl: '/pus/online',
          exchangeStatusParamsKeyObj: { id: 'id', isOnline: 'isOnline' },
          exchangeStatusKey: 'isOnline',
          extraInfo: {
            title: {
              1: '你确定要下架该作品么？',
              0: '你确定要上架该作品么？',
            },
          },
          status: {
            1: '下架',
            0: '上架',
          },
        },
        {
          route: '/manage_works/detail',
          key: 'detail',
        },
      ],
    },
    ...pageObj,
  },
  manage_works_detail_comment: {
    modifyUrl: '/pus/modify',
    detailsUrl: '/pus/{id}',
    requestUrl: '/pus/review/getList',
    tableInfo: {
      columnList: [
        {
          title: '评论类型',
          dataIndex: 'refType',
          key: 'refType',
          needRender: true,
          enumerate: {
            1: '作品评论',
          },
        },
        {
          title: '用户昵称',
          dataIndex: 'appUserName',
          key: 'appUserName',
        },
        {
          title: '评论内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '评论状态',
          dataIndex: 'isShow',
          key: 'isShow',
          needRender: true,
          enumerate: {
            0: '已删除',
            1: '展示',
          },
        },
        {
          title: '评论时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isShow',
          type: 'popconfirm',
          exchangeStatusUrl: '/pus/review/online',
          exchangeStatusParamsKeyObj: { id: 'id', isShow: 'isShow' },
          exchangeStatusKey: 'isShow',
          exchangeStatusParamsPosition: 'params',
          extraInfo: {
            title: {
              1: '你确定要删除该评论么？',
              0: '你确定要恢复该评论么？',
            },
          },
          status: {
            1: '删除',
            0: '恢复',
          },
        },
      ],
    },
    ...pageObj,
  },
  manage_funds: {
    requestUrl: '/capital/getCapitalList',
    searchInfo: {
      searchList: [
        {
          type: 'input',
          label: '用户手机号',
          key: 'mobile',
        },
        {
          type: 'select',
          label: '结算状态',
          key: 'isPay',
          optionList: [
            {
              value: 0,
              label: '未结算',
            },
            {
              value: 1,
              label: '已结算',
            },
          ],
        },
        {
          type: 'monthPicker',
          label: '结算周期',
          key: 'payDate',
          default: getLastMonthStr(),
          // disabledDate: (current: any) => current && current >= moment().startOf('month'),
        },
      ],
      searchActions: [
        {
          text: '查询',
          type: 'primary',
          key: 'search',
        },
        // {
        //   text: '批量结算',
        //   type: 'primary',
        //   key: 'bulk_settlement',
        // },
        {
          text: '导出',
          type: '',
          key: 'export',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '结算流水',
          dataIndex: 'payNo',
          key: 'payNo',
        },
        {
          title: '结算周期',
          dataIndex: 'payDate',
          key: 'payDate',
        },
        {
          title: '用户手机号',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '结算金额',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: '结算信息',
          dataIndex: 'nickname',
          key: 'nickname',
        },
        {
          title: '结算状态',
          dataIndex: 'isPay',
          key: 'isPay',
          needRender: true,
          enumerate: {
            0: '未结算',
            1: '已结算',
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
      ],
      actionList: [
        {
          key: 'detail',
          route: '/manage_funds/detail',
          text: '账户明细',
        },
        {
          key: 'status',
          depend: 'isPay',
          type: 'popconfirm',
          exchangeStatusUrl: '/capital/payCapital',
          exchangeStatusParamsKeyObj: { capid: 'capid' },
          exchangeStatusKey: 'isPay',
          exchangeStatusParamsPosition: 'params',
          extraInfo: {
            title: {
              0: '你确定要结算该流水么？',
              1: '',
            },
          },
          status: {
            0: '去结算',
            1: '',
          },
        },
      ],
    },
    ...pageObj,
  },
  manage_funds_detail: {
    requestUrl: '/capital/getTransationList',
    tableInfo: {
      columnList: [
        {
          title: '流水类型',
          dataIndex: 'refType',
          key: 'refType',
          needRender: true,
          enumerate: {
            1: '购买作品',
            2: '购买商品',
            3: '购买课程',
            4: '结算',
            5: '退款',
          },
        },
        {
          title: '订单号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          title: '流水号',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '流水金额',
          dataIndex: 'amount-direction',
          key: 'amount-direction',
        },
        {
          title: '流水时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [],
    },
    ...pageObj,
  },
  manage_operation_banner: {
    addUrl: '/banner/add',
    modifyUrl: '/banner/modify',
    detailsUrl: '/banner/{id}',
    requestUrl: '/banner/getList',
    searchInfo: {
      searchList: [],
      searchActions: [
        {
          text: '新增',
          type: 'primary',
          key: 'add',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: 'bannerID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '跳转',
          dataIndex: 'jumpType',
          key: 'jumpType',
          needRender: true,
          enumerate: {
            0: '无跳转',
            1: '外部链接',
            2: 'H5',
          },
        },
        {
          title: '简介',
          dataIndex: 'describes',
          key: 'describes',
        },
        {
          title: '状态',
          dataIndex: 'isOnline',
          key: 'isOnline',
          needRender: true,
          enumerate: {
            0: '下架',
            1: '上架',
          },
        },
        {
          title: '更新时间',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isOnline',
          type: 'popconfirm',
          exchangeStatusUrl: '/banner/modify',
          exchangeStatusParamsKeyObj: { id: 'id', isOnline: 'isOnline' },
          exchangeStatusKey: 'isOnline',
          exchangeStatusParamsPosition: 'data',
          extraInfo: {
            title: {
              0: '你确定要上架该banner么？',
              1: '你确定要下架该banner么？',
            },
          },
          status: {
            0: '上架',
            1: '下架',
          },
        },
        {
          key: 'detail',
          text: '详情',
          route: '/manage_operation/banner_detail',
        },
        {
          key: 'sticky',
          text: '置顶',
          type: 'popconfirm',
          exchangeStatusUrl: '/banner/modify',
          exchangeStatusParamsKeyObj: { id: 'id', isTop: 'isTop' },
          exchangeStatusObj: { isTop: 1 },
          exchangeStatusParamsPosition: 'data',
          extraInfo: {
            title: '你确定要置顶该banner么？',
          },
        },
      ],
    },
    ...pageObj,
  },
  manage_operation_activity: {
    addUrl: '/activity/add',
    modifyUrl: '/activity/modify',
    detailsUrl: '/activity/{id}',
    requestUrl: '/activity/getList',
    searchInfo: {
      searchList: [],
      searchActions: [
        {
          text: '新增',
          type: 'primary',
          key: 'add',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '活动ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '活动标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '活动标签',
          dataIndex: 'labelName',
          key: 'labelName',
        },
        {
          title: '活动状态',
          dataIndex: 'isOnline',
          key: 'isOnline',
          needRender: true,
          enumerate: {
            0: '下架',
            1: '上架',
          },
        },
        {
          title: '活动日期',
          dataIndex: 'date',
          key: 'date',
          needRender: true,
          renderDepend: ['gmtBegin', 'gmtEnd'],
        },
        {
          title: '更新时间',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isOnline',
          type: 'popconfirm',
          exchangeStatusUrl: '/activity/modify',
          exchangeStatusParamsKeyObj: { id: 'id', isOnline: 'isOnline' },
          exchangeStatusKey: 'isOnline',
          exchangeStatusParamsPosition: 'data',
          extraInfo: {
            title: {
              0: '你确定要上架该活动么？',
              1: '你确定要下架该活动么？',
            },
          },
          status: {
            0: '上架',
            1: '下架',
          },
        },
        {
          key: 'detail',
          text: '详情',
          route: '/manage_operation/activity_detail',
        },
      ],
    },
    ...pageObj,
  },
  report_list: {
    requestUrl: '/feedback/getReportList',
    searchInfo: {
      searchList: [
        {
          type: 'input',
          label: '作品名称',
          placeholder: '请输入',
          key: 'opusName',
        },
      ],
      searchActions: [
        {
          text: '查询',
          type: 'primary',
          key: 'search',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          // TODO: 不确定
          title: '举报ID',
          dataIndex: 'rid',
          key: 'rid',
        },
        {
          title: '用户昵称',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '用户手机号',
          dataIndex: 'userMobile',
          key: 'userMobile',
        },
        {
          title: '举报作品',
          dataIndex: 'opusName',
          key: 'opusName',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
      ],
      actionList: [],
    },
    ...pageObj,
  },
  push: {
    requestUrl: '/platform/getPushMessageList',
    searchInfo: {
      searchList: [],
      searchActions: [
        {
          text: '新增推送',
          type: 'primary',
          key: 'add',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '推送ID',
          dataIndex: 'pid',
          key: 'pid',
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '推送内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '推送跳转',
          dataIndex: 'pushLink',
          key: 'pushLink',
        },
        {
          title: '用户范围',
          dataIndex: 'pushPersonType',
          key: 'pushPersonType',
          needRender: true,
          enumerate: {
            0: '全部发送',
            1: '单个用户',
          },
        },
        {
          title: '用户人数',
          dataIndex: 'publishNum',
          key: 'publishNum',
        },
        {
          title: '定时发送时间',
          dataIndex: 'pushTime',
          key: 'pushTime',
        },
        {
          title: '状态',
          dataIndex: 'isPublish',
          key: 'isPublish',
          needRender: true,
          enumerate: {
            0: '未发送',
            1: '已发送',
          },
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'isPublish',
          status: {
            1: '',
            0: '编辑',
          },
        },
        {
          key: 'delete',
          text: '删除',
          type: 'popconfirm',
          exchangeStatusUrl: '/platform/delete',
          exchangeStatusParamsKeyObj: { id: 'pid' },
          extraInfo: {
            title: '你确定要删除该条评论么？',
          },
        },
      ],
    },
    ...pageObj,
  },
  customer_feedback: {
    requestUrl: '/feedback/getList',
    tableInfo: {
      columnList: [
        {
          title: '反馈ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '用户昵称',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '用户手机号',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '反馈内容',
          dataIndex: 'contents',
          key: 'contents',
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
        },
      ],
      actionList: [],
    },
    ...pageObj,
  },
  recommend_config: {
    modifyUrl: '/recommend/modify',
    requestUrl: '/recommend/getList',
    tableInfo: {
      columnList: [
        {
          title: '推荐位置',
          dataIndex: 'position',
          key: 'position',
          needRender: true,
          enumerate: {
            1: '首页',
            2: '发现页',
          },
        },
        {
          title: '推荐因子',
          dataIndex: 'divisor',
          key: 'divisor',
        },
        {
          title: '推荐描述',
          dataIndex: 'describes',
          key: 'describes',
        },
        {
          title: '顺序',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          title: '数量',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '列表描述',
          dataIndex: 'listDescribes',
          key: 'listDescribes',
        },
      ],
      actionList: [
        {
          key: 'edit',
          text: '编辑',
        },
      ],
    },
    ...pageObj,
  },
  style_tags: {
    addUrl: '/label/add',
    modifyUrl: '/label/modify',
    requestUrl: '/label/getList',
    searchInfo: {
      searchList: [],
      searchActions: [
        {
          text: '新增',
          type: 'primary',
          key: 'add',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '风格名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '更新时间',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
        },
      ],
      actionList: [
        {
          key: 'view',
          text: '查看',
        },
        {
          key: 'edit',
          text: '编辑',
        },
        {
          key: 'delete',
          text: '删除',
          type: 'popconfirm',
          exchangeStatusUrl: '/label/delete',
          exchangeStatusParamsKeyObj: { id: 'id' },
          extraInfo: {
            title: '你确定要删除该风格么？',
          },
        },
      ],
    },
    ...pageObj,
  },
  authority_account_number: {
    addUrl: '/user/add',
    requestUrl: '/user/getList',
    searchInfo: {
      searchList: [],
      searchActions: [
        {
          text: '新增',
          type: 'primary',
          key: 'add',
        },
      ],
    },
    tableInfo: {
      columnList: [
        {
          title: '账户',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '角色',
          dataIndex: 'roleName',
          key: 'roleName',
        },
        {
          title: '状态',
          dataIndex: 'islock',
          key: 'islock',
          needRender: true,
          enumerate: {
            0: '启用',
            1: '停用',
          },
        },
        {
          title: '更新时间',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
        },
      ],
      actionList: [
        {
          key: 'status',
          depend: 'islock',
          type: 'popconfirm',
          exchangeStatusUrl: '/user/deactivation',
          exchangeStatusParamsKeyObj: { id: 'id', islock: 'islock' },
          exchangeStatusKey: 'islock',
          extraInfo: {
            title: {
              1: '你确定要启用该账号么？',
              0: '你确定要停用该账号么？',
            },
          },
          status: {
            1: '启用',
            0: '停用',
          },
        },
        {
          key: 'reset_password',
          text: '重置密码',
        },
      ],
    },
    ...pageObj,
  },
  authority_role: {
    addUrl: '/role/add',
    modifyUrl: '/role/modify',
    requestUrl: '/role/getList',
    searchInfo: {
      searchList: [],
      searchActions: [
        {
          text: '新增角色',
          type: 'primary',
          key: 'add',
        },
      ],
    },
    tableInfo: {
      scroll: {
        x: 'max-content',
      },
      actionFixed: 'right',
      columnList: [
        {
          fixed: true,
          title: '角色',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '权限',
          dataIndex: 'menuNames',
          key: 'menuNames',
        },
        {
          fixed: 'right',
          title: '更新时间',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
        },
      ],
      actionList: [
        {
          key: 'edit',
          text: '编辑',
        },
      ],
    },
    ...pageObj,
  },
  span_item: {
    input: 5,
    select: 8,
  },
};
