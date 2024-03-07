import React, { memo, useEffect, useRef, useState } from 'react';

import { Box, Input, useToast } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from 'firebaseConfig';

const UploadImg = (props) => {
    const { name, setValue = () => {}, dataInput = null } = props;
    const inputRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState({
        linkImg: dataInput,
        file: null,
    });
    const toast = useToast();

    const uploadImage = async (file) => {
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // const uploadTask = storage.child(`images/${file.name}`).put(file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Xử lý tiến trình upload
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Xử lý lỗi
                console.error('Upload error:', error);
            },
            () => {
                // Khi upload hoàn tất, lấy URL và xử lý
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    toast({
                        title: 'Upload completed!',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right',
                    });
                    setUploadedImage((prev) => ({ ...prev, file: null, linkImg: downloadURL }));
                    setValue(name, downloadURL);
                });
            },
        );
    };

    const handleUploadFirebase = async () => {
        try {
            await uploadImage(uploadedImage?.file);
        } catch (error) {
            toast({
                title: 'Error uploading image',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            console.error('Error uploading image:', error);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage({
                linkImg: imageUrl,
                file: file,
            });
        }
    };

    useEffect(() => {
        return () => {
            uploadedImage?.linkImg && URL.revokeObjectURL(uploadedImage?.linkImg);
        };
    }, [uploadedImage]);

    return (
        <div style={{ display: 'flex' }}>
            <label
                htmlFor="uploadImg"
                style={{
                    lineHeight: '40px',
                    background: '#2f9c74',
                    color: '#ffffff',
                    fontSize: '15px',
                    textTransform: 'capitalize',
                    borderRadius: 'var(--chakra-radii-md)',
                    cursor: 'pointer',
                    padding: '0 10px',
                    height: '40px',
                }}
            >
                Choose Image
            </label>
            {uploadedImage?.linkImg && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1,
                        margin: '0 20px',
                    }}
                >
                    <img alt="" src={uploadedImage?.linkImg} width={100} height={100} />
                    <div>
                        {uploadedImage?.file && (
                            <CheckIcon
                                color={'green.500'}
                                me="16px"
                                h="18px"
                                w="18px"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handleUploadFirebase();
                                }}
                            />
                        )}
                        <DeleteIcon
                            color={'red.500'}
                            me="16px"
                            h="18px"
                            w="18px"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setUploadedImage((prev) => ({ ...prev, linkImg: '' }));
                                inputRef.current.value = '';
                                if (uploadedImage?.linkImg && !uploadedImage?.file) {
                                    const imageRef = ref(storage, uploadedImage?.linkImg);
                                    deleteObject(imageRef)
                                        .then(() => {
                                            toast({
                                                title: 'Delete image from sever completed!',
                                                status: 'success',
                                                duration: 3000,
                                                isClosable: true,
                                                position: 'top-right',
                                            });
                                        })
                                        .catch((error) => {
                                            toast({
                                                title: 'Delete error!',
                                                status: 'error',
                                                duration: 3000,
                                                isClosable: true,
                                                position: 'top-right',
                                            });
                                            console.error('Lỗi khi xóa tệp ảnh:', error);
                                        });
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            <Input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="uploadImg"
                onChange={handleFileUpload}
                // {...register(name, rules)}
                ref={inputRef}
            />
        </div>
    );
};

export default memo(UploadImg);
