export const columns = [
    {
        Header: 'check all',
        key: 'checkbox',
        type: 'checkbox',
    },
    {
        Header: 'Name Vi',
        key: 'nameVi',
        type: 'string',
        width: '200px',
    },
    {
        Header: 'Name En',
        key: 'nameEn',
        type: 'string',
        width: '200px',
    },
    {
        Header: 'Type',
        key: 'type',
        type: 'string',
        width: '150px',
    },
    {
        Header: 'Diet',
        key: 'diet',
        type: 'string',
        width: '100px',
    },
    {
        Header: 'Size',
        key: 'size',
        type: 'string',
        width: '150px',
    },
    {
        Header: 'Average Life span',
        key: 'averageLifespan',
        type: 'string',
        width: '200px',
    },
    {
        Header: 'Created date',
        key: 'createdAt',
        type: 'date',
    },
    {
        Header: 'Updated date',
        key: 'updatedAt',
        type: 'date',
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
                value: /^[a-zA-Z0-9 ]*$/,
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
                value: /^[a-zA-Z0-9 ]*$/,
                message: 'Name does not contain any special character.',
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
    {
        label: 'Weight',
        key: 'weight',
        type: 'string',
        required: false,
        width: '50%',
    },
    {
        label: 'Average Life span',
        key: 'averageLifespan',
        type: 'string',
        required: false,
        width: '50%',
    },
    {
        label: 'Description Vi',
        key: 'descVi',
        type: 'editor',
        required: true,
        width: '100%',
        rules: {
            required: 'Please fill out this field',
            maxLength: { value: 9999, message: 'Maximum length must be less than 9999.' },
        },
    },
    {
        label: 'Description En',
        key: 'descEn',
        type: 'editor',
        required: true,
        width: '100%',
        rules: {
            required: 'Please fill out this field',
            maxLength: { value: 9999, message: 'Maximum length must be less than 9999.' },
        },
    },
];
