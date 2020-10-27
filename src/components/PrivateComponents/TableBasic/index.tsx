import React, { useMemo } from 'react';
import Link from 'umi/link';
import { Table, Popconfirm } from 'antd';
import { PropsInterface, ActionInterface, TableColumnInterface } from '../../Interface';
import DB from '@/DB';
import styles from './index.less';

const keyList = ['id', 'gid', 'ggid', 'rid', 'pid', 'capid', 'userId', 'payDate'];

export default (props: PropsInterface) => {
  const { page, dataSource } = props;
  const {
    tableInfo: { columnList, actionList, scroll = {}, actionFixed = false },
  } = DB[page];
  columnList.map((column: TableColumnInterface) => {
    const columnItem = column;

    if (columnItem.needRender) {
      if (columnItem.renderDepend) {
        columnItem.render = (currentValue: string, record: any) => (
          <span>
            {columnItem.renderDepend
              ? columnItem.renderDepend
                  .reduce((result: string, depend: string) => `${result} - ${record[depend]}`, '')
                  .slice(3)
              : ''}
          </span>
        );
      } else {
        columnItem.render = (currentValue: string) => (
          <span>
            {columnItem.enumerate
              ? columnItem.enumerate[`${currentValue}`]
              : columnItem[`${currentValue}`]}
          </span>
        );
      }
    } else if (columnItem.dataIndex.indexOf('/') >= 0) {
      if (columnItem.dataIndex.indexOf('&') >= 0) {
        const fieldArray = columnItem.dataIndex.split('&').map(item => item.split('/'));
        columnItem.render = (_: string, record: any) => (
          <span>
            {fieldArray.map(field =>
              field.reduce((result, currentField) => result[`${currentField}`], record),
            )}
          </span>
        );
      } else {
        const fieldArray = columnItem.dataIndex.split('/');
        columnItem.render = (_: string, record: any) => (
          <span>
            {fieldArray.reduce((result, currentField) => result[`${currentField}`], record)}
          </span>
        );
      }
    } else if (column.dataIndex === 'amount-direction') {
      columnItem.render = (currentValue: string, record: any) => (
        <span>
          {record.direction === 1 ? '+' : '-'}
          {record.amount}
        </span>
      );
    }
    return columnItem;
  });

  const onPageInfoChange = (currentPage: number, pageSize: number | undefined) =>
    props.pageChangeHandle && props.pageChangeHandle(currentPage, pageSize);

  const action = {
    fixed: actionFixed,
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    render: (text: string, record: any) => (
      <span>
        {actionList.map((actionItem: ActionInterface) => {
          const { route = '', actionText = '', title = '' } = (() => {
            switch (actionItem.key) {
              case 'status':
              case 'update_status':
                return {
                  actionText:
                    actionItem.status && actionItem.depend
                      ? actionItem.status[record[actionItem.depend]]
                      : '',
                  title:
                    actionItem.extraInfo && actionItem.depend
                      ? actionItem.extraInfo.title[record[actionItem.depend]]
                      : '',
                };
              default:
                return {
                  route: actionItem.route,
                  actionText: actionItem.text || '详情',
                  title: actionItem.extraInfo && actionItem.extraInfo.title,
                };
            }
          })();
          if (actionText) {
            if (route) {
              const href = `${route}?${keyList
                .map(key => record[key] && `${key}=${record[key]}`)
                .filter(str => Boolean(str))
                .join('&')}`;
              return (
                <Link key={actionItem.key} className={styles.actionItem} to={href}>
                  {actionText}
                </Link>
              );
            }
            if (actionItem.type === 'popconfirm') {
              return (
                <Popconfirm
                  key={actionItem.key}
                  title={title}
                  onConfirm={() => props.actionsHandle && props.actionsHandle(actionItem, record)}
                >
                  <span className={styles.actionItem} style={{ color: '#FF5400' }}>
                    {actionText}
                  </span>
                </Popconfirm>
              );
            }
            return (
              <span
                key={actionItem.key}
                className={styles.actionItem}
                style={{ color: '#FF5400' }}
                onClick={() => props.actionsHandle && props.actionsHandle(actionItem, record)}
              >
                {actionText}
              </span>
            );
          }
          return null;
        })}
      </span>
    ),
  };

  const columns = [...columnList, actionList.length ? action : {}];

  const pagination = useMemo(() => {
    if (props.pagination === false) {
      return false;
    }
    if (props.pagination === true) {
      return {
        total: props.total,
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        showTotal: () => `共 ${props.total} 条记录`,
        onChange: onPageInfoChange,
        onShowSizeChange: onPageInfoChange,
      };
    }
    return (
      props.pagination || {
        total: props.total,
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        showTotal: () => `共 ${props.total} 条记录`,
        onChange: onPageInfoChange,
        onShowSizeChange: onPageInfoChange,
      }
    );
  }, [props.pagination, props.total]);

  return (
    <div className={styles.container}>
      <Table
        scroll={scroll}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        rowKey={record =>
          keyList.reduce(
            (result: string, key: string) =>
              record[`${key}`] ? `${result}-${record[`${key}`]}` : result,
            '',
          )
        }
      />
    </div>
  );
};
