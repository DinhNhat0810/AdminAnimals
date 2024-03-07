// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ModalFooter,
    SimpleGrid,
    toast,
    useToast,
} from '@chakra-ui/react';
import DevelopmentTable from 'components/tables/DevelopmentTable';
import { useEffect, useState } from 'react';
import { getAllAnimals } from 'services/animals';
import Loading from 'components/loading/Loading';
import CustomModal from 'components/modal/Modal';
import CustomInput from 'components/customInput/CustomInput';
import { useForm } from 'react-hook-form';
import { removeAnimal } from 'services/animals';
import { isNonEmptyArray } from 'utils/common';
import { addFields, columns } from './variables/columnsData';
import { addBanner, updateBanner, getAllBanners, deleteBanner } from 'services/banners';

const actions = [
    {
        type: 'edit',
    },
    {
        type: 'delete',
    },
];

const ContentModal = (props) => {
    const { onClose = () => {}, onSave = () => {}, isEdit, dataDetail } = props;
    const {
        handleSubmit,
        register,
        setValue,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (values) => {
        onSave(values, reset);
    };

    useEffect(() => {
        if (dataDetail && isEdit) {
            for (let key in dataDetail) {
                setValue(key, dataDetail[key]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDetail]);

    return (
        <Box p={4}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {addFields?.map((item, index) => {
                        return (
                            <FormControl
                                key={index}
                                style={{ width: item?.width, padding: '0px 16px', height: item?.height }}
                                isInvalid={item?.required && errors[item?.key]}
                                isRequired={item?.required}
                            >
                                <CustomInput
                                    label={item?.label}
                                    placeholder={item?.label}
                                    isRequired={item?.required}
                                    messageError={item?.required && errors[item?.key] && errors[item?.key]?.message}
                                    type={item?.type}
                                    register={register}
                                    name={item?.key}
                                    id={index}
                                    rules={item?.rules}
                                    setValue={setValue}
                                    trigger={trigger}
                                    dataInput={isEdit ? dataDetail[item?.key] : ''}
                                />
                            </FormControl>
                        );
                    })}

                    <ModalFooter w={'100%'}>
                        <Button
                            style={{ borderRadius: '8px' }}
                            type="submit"
                            colorScheme="blue"
                            mr={4}
                            isLoading={isSubmitting}
                        >
                            Save
                        </Button>
                        <Button style={{ borderRadius: '8px' }} variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </FormControl>
            </form>
        </Box>
    );
};

export default function Settings() {
    const toast = useToast();
    const [dataTable, setDatatable] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });
    const [paginationData, setDataPagination] = useState({
        currentPage: 1,
        hasNextPage: true,
        hasPrevPage: false,
        nextPage: 2,
        prevPage: null,
        totalDocs: 0,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(false);
    const [titleModal, setTitleModal] = useState('Add');
    const [isEdit, setIsEdit] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [checkBox, setCheckbox] = useState([]);
    const [recordDeleteId, setRecordDeleteId] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleDeleteBanner = async (value) => {
        try {
            console.log(value);
            setLoading(true);
            const res = await deleteBanner(value);

            if (res?.status === 'success') {
                toast({
                    title: res?.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
                setOpenDeleteModal(false);
                getBanners();
            } else {
                toast({
                    title: res?.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
                setLoading(false);
            }
            console.log(res);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleEditAnimal = async (value) => {
        try {
            console.log(value);
            setDataDetail(value);
            setTitleModal('Edit animal');
            setIsEdit(true);
            setOpenAddModal(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddAnimal = async (value) => {
        try {
            setTitleModal('Add animal');
            setIsEdit(false);
            setOpenAddModal(true);
        } catch (err) {
            console.log(err);
        }
    };

    const getBanners = async () => {
        try {
            setLoading(true);
            const res = await getAllBanners(params);
            if (res?.payload?.docs) {
                const newRes = res?.payload?.docs?.map((item) => {
                    return {
                        ...item,
                        // updatedAt: moment(item?.updatedAt, 'DD/MM/YYYY').format(''),
                    };
                });
                setDatatable(newRes);
                setDataPagination({
                    currentPage: res?.payload?.currentPage,
                    hasNextPage: res?.payload?.hasNextPage,
                    hasPrevPage: res?.payload?.hasPrevPage,
                    nextPage: res?.payload?.nextPage,
                    prevPage: res?.payload?.prevPage,
                    totalDocs: res?.payload?.totalDocs,
                    totalPages: res?.payload?.totalPages,
                });
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBanners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleChangePageSize = async (value) => {
        setParams((prev) => ({ ...prev, limit: value }));
    };

    const handleNextPage = () => {
        setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    };

    const handlePrevPage = () => {
        if (params.page === 1 || params.page < 2) {
            return;
        }
        setParams((prev) => ({ ...prev, page: prev.page - 1 }));
    };

    const handleGoToLastPage = () => {
        setParams((prev) => ({ ...prev, page: paginationData?.totalPages }));
    };

    const handleGoToFirstPage = () => {
        setParams((prev) => ({ ...prev, page: 1 }));
    };

    const handleSave = async (values, reset) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
            };
            let res;

            if (isEdit) {
                res = await updateBanner(payload?._id, payload);
            } else {
                res = await addBanner(payload);
            }

            if (res?.status === 'success') {
                toast({
                    title: res?.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
                getBanners();
                reset();
                setOpenAddModal(false);
            } else {
                toast({
                    title: res?.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleGetCheckbox = (value) => {
        const ids = value?.map((item) => item._id);
        setCheckbox(ids);
    };

    // Chakra Color Mode
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Loading loading={loading} />
            <CustomModal
                isOpen={openAddModal}
                onClose={() => setOpenAddModal(false)}
                content={
                    <ContentModal
                        isEdit={isEdit}
                        dataDetail={dataDetail}
                        onSave={handleSave}
                        onClose={() => setOpenAddModal(false)}
                    />
                }
                size="6xl"
                title={titleModal}
                hideFooter={true}
            />

            <CustomModal
                isOpen={openDeleteModal}
                onClose={() => {
                    setOpenDeleteModal(false);
                }}
                content={<p style={{ marginLeft: '24px' }}>Are you sure you want to delete?</p>}
                title={'Confirm Delete'}
                onSave={() => handleDeleteBanner(recordDeleteId)}
            />

            <SimpleGrid mb="20px" columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
                <DevelopmentTable
                    columnsData={columns}
                    tableData={dataTable}
                    isPagination
                    onChangePageSize={handleChangePageSize}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    paginationData={paginationData}
                    onGoToLastPage={handleGoToLastPage}
                    onGoToFirstPage={handleGoToFirstPage}
                    actions={actions}
                    onDelete={(value) => {
                        setRecordDeleteId(value);
                        setOpenDeleteModal(true);
                    }}
                    onEdit={handleEditAnimal}
                    onGetCheckBox={handleGetCheckbox}
                    optionsHeader={
                        <Flex justifyContent={'flex-end'} w={'100%'} mb={4}>
                            <Button
                                onClick={() => {
                                    handleAddAnimal();
                                }}
                                style={{ borderRadius: '8px', background: 'green', color: '#fff' }}
                            >
                                Add
                            </Button>
                        </Flex>
                    }
                />
            </SimpleGrid>
        </Box>
    );
}
