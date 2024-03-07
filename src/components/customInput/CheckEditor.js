// App.jsx / App.tsx

import React, { memo, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Input } from '@chakra-ui/react';

const CheckEditor = (props) => {
    const { dataEditor = '', register, name, rules, setValue = () => {}, trigger = () => {}, ...rest } = props;
    console.log('re-render');

    return (
        <Box>
            <Input {...register(name, rules)} hidden={true} readOnly={true} />
            <CKEditor
                {...rest}
                editor={ClassicEditor}
                data={dataEditor}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setValue(name, data);
                    trigger(name);
                }}

                // onBlur={(event, editor) => {
                //     setFocus(name, data);
                // }}
                // onFocus={(event, editor) => {
                //     console.log('Focus.', editor);
                // }}
            />
        </Box>
    );
};

export default memo(CheckEditor);
