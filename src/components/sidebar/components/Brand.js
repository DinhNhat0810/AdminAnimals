import React from 'react';

// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue('navy.700', 'white');

    return (
        <Flex align="center" direction="column">
            <Text fontSize="4xl" as="b" color={logoColor}>
                Admin
            </Text>
            <HSeparator mb="20px" />
        </Flex>
    );
}

export default SidebarBrand;
