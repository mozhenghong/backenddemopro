import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import { Spin, Button, Modal, Input, InputNumber, Radio, notification } from 'antd';
import debounce from 'lodash/debounce';
import BasicInfo from '@/components/PrivateComponents/BasicInfo';
import TableBasic from '@/components/PrivateComponents/TableBasic';
import RichTextEditor from '@/components/PrivateComponents/RichTextEditor';
import {
  ActionInterface,
  BasicInformationInterface,
  ButtonType,
  ExtraActionItemInterface,
  ObjectInterface,
  PagePropsInterface,
} from '@/components/Interface';
import { ConnectState } from '@/models/connect';
import DB from '@/DB';
import styles from './index.less';

const basicInformation = {
  title: '商品信息',
  pictureLabel: '',
  contentArr: [
    {
      key: 'first',
      itemArr: [
        {
          label: '商品ID：',
          text: '',
        },
        {
          label: '商品名称：',
          text: '',
        },
      ],
    },
    {
      key: 'second',
      itemArr: [
        {
          label: '创建时间：',
          text: '',
        },
        {
          label: '更新时间：',
          text: '',
        },
      ],
    },
    {
      key: 'third',
      itemArr: [
        {
          label: '运费：',
          text: '',
        },
      ],
    },
  ],
  extraActions: [
    {
      text: '编辑',
      type: ButtonType.Primary,
      id: 'edit',
    },
  ],
};
const initCommodityAttrInfo = { type: 'X', colour: '', nums: 0 };
const initCommodityAttrModalInfo = { title: '', key: '' };

interface EditInfoInterface {
  goodsName: string;
  transportationPrice: number;
}

interface CommodityAttrInfoInterface {
  type: string;
  colour: string;
  nums: number;
  ggid?: number;
  limitNums?: number;
}

const ManageCommodityDetail = (props: PagePropsInterface) => {
  const {
    query: { gid: id },
  } = props.location;
  const page = 'manage_commodity_detail_attributes';
  const extraSearchInfo = { id };
  const { requestUrl, modifyUrl, modifyCommodityAttributesUrl } = DB[page];
  const { dispatch } = props;
  const info: ObjectInterface =
    props.tableList && props.tableList.manage_commodity_detail_attributes_list
      ? props.tableList.manage_commodity_detail_attributes_list
      : {};

  const [loading, setLoading] = useState<boolean>(true);
  const [editInfoModalLoading, setEditInfoModalLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditInfoInterface>({
    goodsName: '',
    transportationPrice: 0,
  });
  const [modifyCommodityAttrModalVisible, setModifyCommodityAttrModalVisible] = useState<boolean>(
    false,
  );
  const [commodityAttrModalInfo, setCommodityAttrModalInfo] = useState<{
    title: string;
    key: string;
  }>({ ...initCommodityAttrModalInfo });
  const [commodityAttrInfo, setCommodityAttrInfo] = useState<CommodityAttrInfoInterface>({
    ...initCommodityAttrInfo,
  });
  const [basicInfo, setBasicInfo] = useState<BasicInformationInterface>(basicInformation);
  const [updateList, setUpdateList] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      await dispatch({
        type: 'tableList/getTableList',
        payload: { requestUrl, searchInfo: { ...extraSearchInfo }, page, method: 'GET' },
      });
      setLoading(false);
    };
    void loadData();
  }, [updateList]);

  useEffect(() => {
    const contentArr = [
      {
        key: 'first',
        itemArr: [
          {
            label: '商品ID：',
            text: info.gid,
          },
          {
            label: '商品名称：',
            text: info.goodsName,
          },
        ],
      },
      {
        key: 'second',
        itemArr: [
          {
            label: '创建时间：',
            text: info.createTime,
          },
          {
            label: '更新时间：',
            text: info.mofityTime,
          },
        ],
      },
      {
        key: 'third',
        itemArr: [
          {
            label: '运费：',
            text: `￥${info.transportationPrice}`,
          },
        ],
      },
    ];
    const newBasicInfo = { ...basicInformation, contentArr };
    setBasicInfo(newBasicInfo);
    setEditInfo({
      goodsName: info.goodsName || '',
      transportationPrice: info.transportationPrice,
    });
  }, [props]);

  const onActionsHandle = (action: ExtraActionItemInterface) => {
    if (action.id === 'edit') {
      setModalVisible(true);
    }
  };

  const onConfirmEdit = async () => {
    setEditInfoModalLoading(true);
    const params = { gid: id, ...editInfo };
    await dispatch({
      type: 'modify/modifyInfo',
      payload: { modifyUrl, params },
    });
    setModalVisible(false);
    setUpdateList(!updateList);
    setEditInfoModalLoading(false);
  };

  const saveEditorContentHandle = useCallback(
    async (htmlContent: string) => {
      try {
        const params = { gid: id, description: htmlContent };
        await dispatch({
          type: 'modify/modifyInfo',
          payload: { modifyUrl, params },
        });
        notification.success({ message: '保存成功！' });
      } catch (error) {
        console.error(error);
      }
    },
    [id],
  );

  const closeModifyCommodityAttrModal = () => {
    setModifyCommodityAttrModalVisible(false);
    setCommodityAttrModalInfo({ ...initCommodityAttrModalInfo });
  };

  const onModifyCommodityAttr = (record?: ObjectInterface) => {
    if (record) {
      const { type = 1, colour = '', nums = 0, ggid } = record;
      setCommodityAttrModalInfo({ key: 'edit', title: '编辑商品属性' });
      setCommodityAttrInfo({ type, colour, nums, ggid });
    } else {
      setCommodityAttrModalInfo({ key: 'add', title: '新增商品属性' });
      setCommodityAttrInfo({ ...initCommodityAttrInfo });
    }
    setModifyCommodityAttrModalVisible(true);
  };

  const actionsHandle = useCallback(
    async (action: ActionInterface, record: any) => {
      if (action.key === 'edit') {
        onModifyCommodityAttr(record);
      }
      if (action.key === 'status') {
        await dispatch({
          type: 'modify/modifyInfo',
          payload: {
            modifyUrl: '/goods/isOnline',
            params: { gid: record.ggid, isOnline: record.isOnline === 0 ? 1 : 0 },
            paramsPosition: 'params',
          },
        });
        setUpdateList(!updateList);
      }
    },
    [onModifyCommodityAttr, updateList],
  );

  const onConfirmEditCommodityAttr = async () => {
    const { nums, colour, type } = commodityAttrInfo;
    if (nums && colour && type) {
      setEditInfoModalLoading(true);
      if (commodityAttrModalInfo.key === 'edit') {
        const params = { gid: id, ...commodityAttrInfo };
        await dispatch({
          type: 'modify/modifyInfo',
          payload: { modifyUrl: modifyCommodityAttributesUrl, params },
        });
      }
      if (commodityAttrModalInfo.key === 'add') {
        await dispatch({
          type: 'modify/modifyInfo',
          payload: {
            modifyUrl: '/goods/addGoodsDetail',
            params: { gid: id, ...commodityAttrInfo },
          },
        });
      }
      closeModifyCommodityAttrModal();
      setUpdateList(!updateList);
      setEditInfoModalLoading(false);
    } else {
      notification.error({
        message: `请填写完整商品属性！`,
      });
    }
  };

  const onEditInfoChange = debounce(
    (key: string, value: number | string) =>
      setEditInfo((prevEditInfo: EditInfoInterface) => ({
        ...prevEditInfo,
        [`${key}`]: value,
      })),
    300,
  );

  const onCommodityAttrInfoChange = debounce(
    (key: string, value: number | string) =>
      setCommodityAttrInfo((prevEditInfo: CommodityAttrInfoInterface) => ({
        ...prevEditInfo,
        [`${key}`]: value,
      })),
    300,
  );

  return (
    <PageHeaderWrapper className={styles.main}>
      <Spin spinning={loading} size="large">
        <hr />
        <BasicInfo basicInfo={basicInfo} onActionsHandle={onActionsHandle} />
        <hr />

        <div className={styles.basic_block}>
          <div className={styles.flex} style={{ marginBottom: '12px' }}>
            <h3 style={{ marginBottom: '0' }}>商品属性</h3>
            <Button
              type="primary"
              style={{ marginLeft: 'auto' }}
              onClick={() => onModifyCommodityAttr()}
            >
              新增
            </Button>
          </div>
          <TableBasic
            pagination={false}
            page={page}
            dataSource={
              props.tableList && props.tableList[`${page}_list`]
                ? props.tableList[`${page}_list`].goodsDetailList
                : []
            }
            actionsHandle={actionsHandle}
          />
        </div>

        <div className={styles.basic_block}>
          <h3>商品预览</h3>
          <div className={styles.flex}>
            {info.goodsPictureList &&
              info.goodsPictureList.map((item: ObjectInterface) => (
                <div key={`${item.ggid}-${item.gid}`} className={styles.basic_icon}>
                  <img src={item.picture} alt="" />
                </div>
              ))}
          </div>
        </div>

        <div className={styles.basic_block}>
          <RichTextEditor
            title="商品详情"
            htmlContent={info.description || ''}
            saveEditorContentHandle={saveEditorContentHandle}
          />
        </div>

        <Modal
          title="编辑商品信息"
          visible={modalVisible}
          onOk={onConfirmEdit}
          onCancel={() => setModalVisible(false)}
          destroyOnClose
          maskClosable={false}
          closable={false}
          okButtonProps={{ disabled: editInfoModalLoading }}
          cancelButtonProps={{ disabled: editInfoModalLoading }}
        >
          <Spin spinning={editInfoModalLoading} size="large">
            <div className={styles.flex}>
              <div className={styles.basic_label}>商品名称：</div>
              <Input
                maxLength={10}
                defaultValue={info.goodsName || ''}
                onChange={e => onEditInfoChange('goodsName', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>商品运费：</div>
              {/* TODO: 可以输入汉字 */}
              <InputNumber
                min={0}
                defaultValue={info.transportationPrice}
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => (value ? value.replace(/￥\s?|(,*)/g, '') : '')}
                onChange={value => onEditInfoChange('transportationPrice', Number(value))}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>商品价格：</div>
              {/* TODO: 可以输入汉字 */}
              <InputNumber
                min={0}
                defaultValue={info.price}
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => (value ? value.replace(/￥\s?|(,*)/g, '') : '')}
                onChange={value => onEditInfoChange('price', Number(value))}
              />
            </div>
          </Spin>
        </Modal>

        <Modal
          title={commodityAttrModalInfo.title}
          visible={modifyCommodityAttrModalVisible}
          onOk={onConfirmEditCommodityAttr}
          key={commodityAttrModalInfo.key}
          onCancel={() => closeModifyCommodityAttrModal()}
          destroyOnClose
          maskClosable={false}
          closable={false}
          okButtonProps={{ disabled: editInfoModalLoading }}
          cancelButtonProps={{ disabled: editInfoModalLoading }}
        >
          <Spin spinning={editInfoModalLoading} size="large">
            <div className={styles.flex}>
              <div className={styles.basic_label}>大小：</div>
              <Radio.Group
                onChange={e => onCommodityAttrInfoChange('type', e.target.value)}
                defaultValue={commodityAttrInfo.type}
              >
                <Radio value="S">S</Radio>
                <Radio value="M">M</Radio>
                <Radio value="L">L</Radio>
                <Radio value="均码">均码</Radio>
              </Radio.Group>
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>颜色：</div>
              <Input
                defaultValue={commodityAttrInfo.colour}
                onChange={e => onCommodityAttrInfoChange('colour', e.target.value)}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>库存：</div>
              <InputNumber
                min={0}
                max={100000}
                defaultValue={commodityAttrInfo.nums}
                onChange={value => onCommodityAttrInfoChange('nums', Number(value))}
              />
            </div>
            <div className={styles.basic_block} />
            <div className={styles.flex}>
              <div className={styles.basic_label}>限购：</div>
              <InputNumber
                min={0}
                defaultValue={commodityAttrInfo.limitNums}
                onChange={value => onCommodityAttrInfoChange('limitNums', Number(value))}
              />
            </div>
            <div className={styles.basic_block} />
          </Spin>
        </Modal>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(({ tableList }: ConnectState) => ({ tableList }))(ManageCommodityDetail);
