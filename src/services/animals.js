import * as httpRequest from '../utils/httpRequest';

export const getAllAnimals = async (params, callback = () => {}, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('animals/all?' + queryString, {}, config);
        return res;
    } catch (error) {
        callback(error);
    }
};
