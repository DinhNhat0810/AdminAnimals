import * as httpRequest from '../utils/httpRequest';

export const login = async (payload, callback = () => {}) => {
    try {
        const res = await httpRequest.post('auth/login', payload);
        return res.data;
    } catch (error) {
        callback(error);
    }
};
