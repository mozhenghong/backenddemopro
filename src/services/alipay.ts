import request from '@/utils/request';

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
