import request from '@/utils/request';
import { ObjectInterface } from '@/components/Interface';
import { pushInfoInterface } from '@/pages/manage_system/push';
import { stringify } from 'querystring';

// TODO: file 文件类型
export async function uploadFile(data: any) {
  return request('/file/upload', {
    method: 'POST',
    data,
  });
}

export async function resetAccountPassword(params: ObjectInterface) {
  return request('/user/resetPass', {
    method: 'POST',
    params,
  });
}

export async function getAllRoles() {
  return request('/role/getAll', { method: 'GET' });
}

export async function getPersonAllAuthorizedMenu(params: ObjectInterface) {
  return request('/menu/getListByUserId', { method: 'GET', params });
}

export async function getAllLabelList() {
  return request('/label/getAll', { method: 'GET' });
}

// 订单分账配置
export async function getOrderRatio() {
  return request('/order/getOrderRatio', { method: 'GET' });
}

export async function updateOrderRatio(params: { userRatio: number; platfromRatio: number }) {
  return request('/order/operateOrderRatio', { method: 'POST', params });
}

// 推送
export async function addPushInfo(data: pushInfoInterface) {
  return request('/platform/add', { method: 'POST', data });
}

// 资金管理
export async function exportFundsList(params: {
  mobile?: string;
  isPay?: number;
  payDate?: string;
}) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://admin-api.yu-zuo.com' : '';
  const basePrefix = '/admin';
  window.open(`${baseUrl}${basePrefix}/capital/exportUserCapital?${stringify(params)}`);
}

export async function getBankInfo(params: { userId: string; payDate: string }) {
  return request('/capital/getBankInfo', { method: 'POST', params });
}

export async function getUserBalance(params: { userId: string }) {
  return request('/capital/getUserAmount', { method: 'POST', params });
}

// 订单管理
export async function downloadCompositeImage(params: { id: string }) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://admin-api.yu-zuo.com' : '';
  const basePrefix = '/admin';
  window.open(`${baseUrl}${basePrefix}/order/downloadByOrderId?${stringify(params)}`);
}
