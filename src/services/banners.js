import * as httpRequest from '../utils/httpRequest';

export const getAllBanners = async (params, callback = () => {}, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('banners/all?' + queryString, {}, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const addBanner = async (payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.post('banners/add', payload, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};

export const updateBanner = async (id, payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.put('banners/update/' + id, payload, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};

export const deleteBanner = async (id, callback = () => {}, config) => {
    try {
        const res = await httpRequest.remove('banners/delete/' + id, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};
