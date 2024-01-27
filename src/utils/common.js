export const DEFAULT_AVATAR =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1182173601.1677507032&semt=ais';

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const isEmptyArray = (array) => {
    if (Array.isArray(array) && array.length === 0) {
        return true;
    }

    return false;
};

export const convertToVnd = (number) => {
    if (typeof +number === 'number') {
        return number?.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    }

    return 0;
};

export const isNonEmptyArray = (arr) => {
    return Array.isArray(arr) && arr?.length > 0;
};
