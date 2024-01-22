export const columns = [
    {
        Header: 'Name Vi',
        key: 'nameVi',
        type: 'string',
    },
    {
        Header: 'Name En',
        key: 'nameEn',
        type: 'string',
    },
    {
        Header: 'Type',
        key: 'type',
        type: 'string',
    },
    {
        Header: 'Diet',
        key: 'diet',
        type: 'string',
    },
    {
        Header: 'Size',
        key: 'size',
        type: 'string',
    },
    {
        Header: 'Action',
        key: 'action',
        type: 'action',
    },
];

export const addFields = [
    {
        label: 'Name Vi',
        key: 'nameVi',
        type: 'string',
        required: true,
        width: '50%',
        rules: {
            required: 'Please fill out this field',
            minLength: { value: 2, message: 'Minimum length must be bigger than be 2.' },
            maxLength: { value: 100, message: 'Maximum length must be less than 100.' },
            pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Name does not contain any special character.',
            },
        },
    },
    {
        label: 'Name En',
        key: 'nameEn',
        type: 'string',
        required: true,
        width: '50%',
        rules: {
            required: 'Please fill out this field',
            minLength: { value: 2, message: 'Minimum length must be bigger than be 2.' },
            maxLength: { value: 100, message: 'Maximum length must be less than 100.' },
            pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Name does not contain any special character.',
            },
        },
    },
    {
        label: 'Description Vi',
        key: 'descVi',
        type: 'string',
        required: true,
        width: '50%',
        rules: {
            required: 'Please fill out this field',
            minLength: { value: 10, message: 'Minimum length must be bigger than be 10.' },
            maxLength: { value: 5000, message: 'Maximum length must be less than 5000.' },
            pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Description does not contain any special character.',
            },
        },
    },
    {
        label: 'Type',
        key: 'type',
        type: 'string',
        required: false,
        width: '50%',
    },
    {
        label: 'Diet',
        key: 'diet',
        type: 'string',
        required: false,
        width: '50%',
    },
    {
        label: 'Size',
        key: 'size',
        type: 'string',
        required: false,
        width: '50%',
    },
];
