import request from '@/utils/request';

//项目管理模块
export async function priceDictionary() {
    return request('examination_package/v1/dictionary/area', {
        method: 'POST'
    });
}

export async function brandDictionary() {
    return request('examination_package/v1/dictionary/brand', {
        method: 'POST'
    });
}
export async function getProjectList(data) {
    return request('examination_package/v1/list', {
        method: 'POST',
        data,
    });
}
export async function upperShelf(data) {
    return request('examination_package/v1/upper_shelf', {
        method: 'POST',
        data,
    });
}
export async function lowersShelf(data) {
    return request('examination_package/v1/lower_shelf', {
        method: 'POST',
        data,
    });
}
export async function getSelectProjectList(data) {
    return request('examination_package/v1/mjkb/project', {
        method: 'POST',
        data,
    });
}
export async function addProjectList(data) {
    return request('examination_package/v1/save', {
        method: 'POST',
        data,
    });
}
export async function getProjectDetail(data) {
    return request('examination_package/v1/detail', {
        method: 'POST',
        data,
    });
}

//服务订单管理模块
export async function getServiceOrderList(data) {
    return request('order/v1/examination/reserve/list', {
        method: 'POST',
        data,
    });
}
export async function getServiceOrderDetail(data) {
    return request('order/v1/examination/reserve/detail', {
        method: 'POST',
        data,
    });
}
//取消订单
export async function cancelOrder(data) {
    return request('order/v1/examination/reserve/end', {
        method: 'POST',
        data,
    });
}

//采样点管理
export async function  getsamplingPointList(data) {
    return request('merchant_examination/v1/query', {
        method: 'POST',
        data,
    });
}
//获取区域
export async function getArea() {
    return request('mehealth-yard/common/region/get_all_region_list', {
        method: 'POST',
    });
}
//下架采样点
export async function downShelf(data) {
    return request('merchant_examination_package/v1/down_shelf', {
        method: 'POST',
        data
    });
}
//查询诊所详情
export async function getMerchant(data) {
    return request('merchant_examination/v1/get_merchant', {
        method: 'POST',
        data
    });
}
//新增采样点
export async function addMerchant(data) {
    return request('merchant_examination/v1/insert', {
        method: 'POST',
        data
    });
}
//更新采样点
export async function updateMerchant(data) {
    return request('merchant_examination/v1/update', {
        method: 'POST',
        data
    });
}

//查询采样点项目
export async function getMerchantExamination(data) {
    return request('merchant_examination_package/v1/query_list', {
        method: 'POST',
        data
    });
}

//删除采样点项目
export async function deleteMerchant(data) {
    return request('merchant_examination_package/v1/delete', {
        method: 'POST',
        data
    });
}
//查询新增项目列表
export async function getAddMerchantExamination(data) {
    return request('examination_package/v1/list', {
        method: 'POST',
        data
    });
}
//新增采样点管理项目
export async function AddMerchantExamination(data) {
    return request('merchant_examination_package/v1/insert', {
        method: 'POST',
        data
    });
}
//查询下属地区
export async function getRegionListByParentCode(data) {
    return request('common/region/get_region_list_by_parent_code', {
        method: 'POST',
        data
    });
}