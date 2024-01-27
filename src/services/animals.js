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

export const addAnimal = async (payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.post('animals/create', payload, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};

export const updateAnimal = async (id, payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.put('animals/update/' + id, payload, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};

export const removeAnimal = async (payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.put('animals/remove', payload, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};

export const deleteAnimal = async (payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.put('animals/force-delete', payload, config);
        return res?.data;
    } catch (error) {
        callback(error);
    }
};
