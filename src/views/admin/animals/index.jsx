// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import DevelopmentTable from 'components/tables/DevelopmentTable';
import { columnsDataDevelopment } from 'views/admin/animals/variables/columnsData';

import { useEffect, useState } from 'react';
import { getAllAnimals } from 'services/animals';
import Loading from 'components/loading/Loading';

export default function Settings() {
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

    // Chakra Color Mode
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Loading loading={loading} />
            <SimpleGrid mb="20px" columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
                <DevelopmentTable
                    columnsData={columnsDataDevelopment}
                    tableData={dataTable}
                    isPagination
                    onChangePageSize={handleChangePageSize}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    paginationData={paginationData}
                    onGoToLastPage={handleGoToLastPage}
                    onGoToFirstPage={handleGoToFirstPage}
                />
            </SimpleGrid>
        </Box>
    );
}
