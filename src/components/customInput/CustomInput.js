// Chakra imports
import { Flex, FormErrorMessage, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import React from 'react';
import CheckEditor from './CheckEditor';

const CustomInput = (props) => {
    const {
        label,
        placeholder,
        type,
        mb,
        messageError,
        isRequired,
        styleWrapper,
        rules = {},
        register,
        name,
        setValue = () => {},
        trigger = () => {},
        dataInput,
        id,
        ...rest
    } = props;

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

    return (
        <Flex direction="column" style={styleWrapper}>
            <FormLabel display="flex" ms="10px" fontSize="sm" color={textColorPrimary} fontWeight="bold">
                {label}
            </FormLabel>

            <div style={{ paddingBottom: '28px', position: 'relative', marginBottom: '10px' }}>
                {type === 'editor' ? (
                    <CheckEditor
                        dataEditor={dataInput}
                        register={register}
                        setValue={setValue}
                        name={name}
                        rules={rules}
                        trigger={trigger}
                    />
                ) : (
                    <Input
                        {...rest}
                        type={type}
                        fontWeight="500"
                        placeholder={placeholder}
                        {...register(name, rules)}
                        _placeholder={{ fontWeight: '400', color: 'secondaryGray.600' }}
                    />
                )}
                {isRequired && (
                    <FormErrorMessage style={{ position: 'absolute', marginLeft: '4px' }}>
                        {messageError}
                    </FormErrorMessage>
                )}
            </div>
        </Flex>
    );
};

export default CustomInput;
