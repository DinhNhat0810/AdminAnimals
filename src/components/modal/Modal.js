/* eslint-disable */
import {
    Button,
    useDisclosure,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    ModalHeader,
    FormControl,
    FormLabel,
    Input,
    Modal,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';

function CustomModal(props) {
    const {
        title = 'Modal',
        onOpen = () => {},
        onClose = () => {},
        isOpen,
        initialRef,
        finalRef,
        size,
        closeOnOverlayClick = true,
        labelOkBtn = 'Ok',
        labelCancelBtn = 'Cancel',
        isHideOkBtn = false,
        isHideCancelBtn = false,
        isHideCloseBtn = false,
        content,
        styleModal,
        closeOnEsc,
    } = props;

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                initialFinalRef={finalRef}
                isOpen={isOpen}
                size={size}
                onClose={onClose}
                closeOnOverlayClick={closeOnOverlayClick}
                style={styleModal}
                closeOnEsc={closeOnEsc}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    {!isHideCloseBtn && <ModalCloseButton />}
                    {content}
                    <ModalFooter>
                        {!isHideOkBtn && (
                            <Button style={{ borderRadius: '8px' }} colorScheme="blue" mr={4}>
                                {labelOkBtn}
                            </Button>
                        )}
                        {!isHideCancelBtn && (
                            <Button style={{ borderRadius: '8px' }} variant="outline" onClick={onClose}>
                                {labelCancelBtn}
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CustomModal;
