// Chakra imports
import { Flex, FormErrorMessage, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import React from 'react';

export default function Default(props) {
    const { id, label, extra, placeholder, type, mb, messageError, isRequired, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

    return (
        <Flex direction="column" mb={mb ? mb : '30px'}>
            <FormLabel
                display="flex"
                ms="10px"
                htmlFor={id}
                fontSize="sm"
                color={textColorPrimary}
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
            >
                {label}
                <Text fontSize="sm" fontWeight="400" ms="2px">
                    {extra}
                </Text>
            </FormLabel>

            <div style={{ paddingBottom: '28px', position: 'relative', marginBottom: '10px' }}>
                <Input
                    {...rest}
                    type={type}
                    id={id}
                    fontWeight="500"
                    variant="main"
                    placeholder={placeholder}
                    _placeholder={{ fontWeight: '400', color: 'secondaryGray.600' }}
                    h="44px"
                    maxh="44px"
                />

                {isRequired && (
                    <FormErrorMessage style={{ position: 'absolute', marginLeft: '4px', bottom: '26px' }}>
                        {messageError}
                    </FormErrorMessage>
                )}
            </div>
        </Flex>
    );
}
