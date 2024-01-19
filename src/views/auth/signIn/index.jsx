import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
// Custom components
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/auth.png';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { login } from 'services/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'redux/user/userSlice';

function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const dispatch = useDispatch();
    const toast = useToast();

    const onSubmit = async (values) => {
        try {
            const payload = {
                username: values?.username,
                password: values?.password,
            };

            const res = await login(payload);
            if (res?.status === 'Success') {
                dispatch(loginSuccess({ accessToken: res?.payload?.accessToken, username: res?.payload?.username }));
                toast({
                    title: res?.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                toast({
                    title: res?.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: '100%', md: 'max-content' }}
                w="100%"
                mx={{ base: 'auto', lg: '0px' }}
                me="auto"
                h="100%"
                alignItems="start"
                justifyContent="center"
                mb={{ base: '30px', md: '60px' }}
                px={{ base: '25px', md: '0px' }}
                mt={{ base: '40px', md: '14vh' }}
                flexDirection="column"
            >
                <Box me="auto" w="100%">
                    <Heading color={textColor} fontSize="36px" textAlign="center" mb="40px">
                        Admin
                    </Heading>
                </Box>
                <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: '100%', md: '420px' }}
                    maxW="100%"
                    background="transparent"
                    borderRadius="15px"
                    mx={{ base: 'auto', lg: 'unset' }}
                    me="auto"
                    mb={{ base: '20px', md: 'auto' }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <FormControl isInvalid={errors.username || errors.password}>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                Username
                            </FormLabel>
                            <div style={{ paddingBottom: '28px', position: 'relative', marginBottom: '10px' }}>
                                <Input
                                    variant="auth"
                                    fontSize="sm"
                                    ms={{ base: '0px', md: '0px' }}
                                    fontWeight="500"
                                    size="lg"
                                    {...register('username', {
                                        required: 'Please fill out this field',
                                        minLength: { value: 4, message: 'Minimum length must be bigger than be 4.' },
                                        maxLength: { value: 20, message: 'Maximum length must be less than 20.' },
                                        pattern: {
                                            value: /^[a-zA-Z0-9]*$/,
                                            message: 'Username does not contain any special character.',
                                        },
                                    })}
                                />
                                <FormErrorMessage style={{ position: 'absolute', marginLeft: '4px' }}>
                                    {errors.username && errors.username.message}
                                </FormErrorMessage>
                            </div>

                            <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
                                Password
                            </FormLabel>
                            <InputGroup size="md" style={{ paddingBottom: '28px', position: 'relative' }}>
                                <Input
                                    fontSize="sm"
                                    mb="24px"
                                    size="lg"
                                    type={show ? 'text' : 'password'}
                                    variant="auth"
                                    id="password_field_1"
                                    {...register('password', {
                                        required: 'Please fill out this field',
                                        minLength: { value: 4, message: 'Minimum length must be bigger than be 4.' },
                                        maxLength: { value: 20, message: 'Maximum length must be less than 20.' },
                                        pattern: {
                                            value: /^[a-zA-Z0-9@]*$/,
                                            message: 'Password does not contain any special character.',
                                        },
                                    })}
                                />
                                <FormErrorMessage style={{ position: 'absolute', marginLeft: '4px', bottom: '26px' }}>
                                    {errors?.password && errors.password.message}
                                </FormErrorMessage>
                                <InputRightElement id="password_field_2" display="flex" alignItems="center" mt="4px">
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: 'pointer' }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>

                            <Flex justifyContent="space-between" align="center" mb="24px">
                                {/* <FormControl display="flex" alignItems="center">
                                <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                                <FormLabel
                                    htmlFor="remember-login"
                                    mb="0"
                                    fontWeight="normal"
                                    color={textColor}
                                    fontSize="sm"
                                >
                                    Keep me logged in
                                </FormLabel>
                            </FormControl> */}
                                {/* <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink> */}
                            </Flex>
                            <Button
                                fontSize="sm"
                                variant="brand"
                                fontWeight="500"
                                w="100%"
                                h="50"
                                mb="24px"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </FormControl>
                    </form>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
