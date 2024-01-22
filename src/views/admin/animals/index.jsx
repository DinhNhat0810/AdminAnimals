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
import { columns, addFields } from 'views/admin/animals/variables/columnsData';
import { useEffect, useState } from 'react';
import { getAllAnimals } from 'services/animals';
import Loading from 'components/loading/Loading';
import CustomModal from 'components/modal/Modal';
import CustomInput from 'components/customInput/CustomInput';
import { useForm } from 'react-hook-form';
import { addAnimal } from 'services/animals';

const actions = [
    {
        type: 'edit',
    },
    {
        type: 'delete',
    },
];

const ContentAddModal = (props) => {
    const { onClose = () => {}, onSave = () => {} } = props;
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (values) => {
        onSave(values);
    };

    return (
        <Box p={4}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <FormControl style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {addFields?.map((item, index) => {
                        return (
                            <FormControl
                                key={index}
                                style={{ width: '50%', padding: '0px 16px' }}
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
                            Add
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
    const [openAddModal, setOpenAddModal] = useState(false);

    const handleDeleteAnimal = async (value) => {
        try {
            console.log(value);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditAnimal = async (value) => {
        try {
            console.log(value);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddAnimal = async (value) => {
        try {
            setOpenAddModal(true);
            console.log(value);
        } catch (err) {
            console.log(err);
        }
    };

    const getAnimals = async () => {
        try {
            setLoading(true);
            const res = await getAllAnimals(params);
            if (res?.payload?.docs) {
                setDatatable(res?.payload?.docs);
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
        getAnimals();
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

    const handleSave = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
            };

            const res = await addAnimal(payload);
            if (res?.status === 'success') {
                toast({
                    title: res?.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
                getAnimals();
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

    // Chakra Color Mode
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Loading loading={loading} />
            <CustomModal
                isOpen={openAddModal}
                onClose={() => setOpenAddModal(false)}
                content={<ContentAddModal onSave={handleSave} onClose={() => setOpenAddModal(false)} />}
                size="6xl"
                title="Add animal"
                hideFooter={true}
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
                    onDelete={handleDeleteAnimal}
                    onEdit={handleEditAnimal}
                    onAdd={handleAddAnimal}
                    optionsHeader={
                        <Flex justifyContent={'flex-end'} mb={4}>
                            <Button
                                onClick={() => {
                                    setOpenAddModal(true);
                                }}
                                style={{ borderRadius: '8px', backgroundColor: '#422afb', color: '#fff' }}
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
