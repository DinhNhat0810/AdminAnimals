import { validateSpecialCharactersRegex } from 'utils/constant';

export const columns = [
    {
        Header: 'Title Vi',
        key: 'titleVi',
        type: 'string',
    },
    {
        Header: 'Title En',
        key: 'titleVi',
        type: 'string',
    },
    {
        Header: 'Description Vi',
        key: 'descVi',
        type: 'string',
    },

    {
        Header: 'Description En',
        key: 'descEn',
        type: 'string',
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
        label: 'Title Vi',
        key: 'titleVi',
        type: 'string',
        required: true,
        width: '50%',
        rules: {
            required: 'Please fill out this field',
            minLength: { value: 2, message: 'Minimum length must be bigger than be 2.' },
            maxLength: { value: 100, message: 'Maximum length must be less than 100.' },
            pattern: {
                value: validateSpecialCharactersRegex,
                message: 'Name does not contain any special character.',
            },
        },
    },
    {
        label: 'Title En',
        key: 'titleEn',
        type: 'string',
        required: true,
        width: '50%',
        rules: {
            required: 'Please fill out this field',
            minLength: { value: 2, message: 'Minimum length must be bigger than be 2.' },
            maxLength: { value: 100, message: 'Maximum length must be less than 100.' },
            pattern: {
                value: validateSpecialCharactersRegex,

                message: 'Name does not contain any special character.',
            },
        },
    },

    {
        label: 'Description Vi',
        key: 'descVi',
        type: 'string',
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
        type: 'string',
        required: true,
        width: '100%',
        rules: {
            required: 'Please fill out this field',
            maxLength: { value: 9999, message: 'Maximum length must be less than 9999.' },
        },
    },
    {
        label: 'Image',
        key: 'imageUrl',
        type: 'uploadImg',
        required: true,
        width: '100%',
    },
];
