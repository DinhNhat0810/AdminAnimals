/* eslint-disable */
import {
    Flex,
    Progress,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Select,
    Tr,
    useColorModeValue,
    Tooltip,
    IconButton,
    Button,
    Checkbox,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import Menu from 'components/menu/MainMenu';
import React, { useMemo, useState } from 'react';
import { actions, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    DeleteIcon,
    AddIcon,
    EditIcon,
} from '@chakra-ui/icons';
import { pageSizeOptions } from 'utils/constant';
import moment from 'moment';
import { isNonEmptyArray } from 'utils/common';

export default function DevelopmentTable(props) {
    const {
        columnsData,
        tableData,
        isPagination,
        onChangePageSize = () => {},
        onNextPage = () => {},
        onPrevPage = () => {},
        paginationData,
        onGoToLastPage = () => {},
        onGoToFirstPage = () => {},
        actions = [],
        onAdd = () => {},
        onEdit = () => {},
        onDelete = () => {},
        onGetCheckBox = () => {},
        optionsHeader,
    } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const [checked, setChecked] = useState([]);
    const data = useMemo(() => {
        const newData = tableData?.map((item) => ({
            ...item,
            checked: false,
        }));
        setChecked(newData);
        return newData;
    }, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance;
    initialState.pageSize = 10;

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = checked?.map((checkbox) =>
            checkbox._id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox,
        );
        setChecked(updatedCheckboxes);
        onGetCheckBox(updatedCheckboxes?.filter((item) => item.checked));
    };

    const handleCheckAll = (value) => {
        const updatedCheckboxes = checked?.map((checkbox) => ({
            ...checkbox,
            checked: value,
        }));
        setChecked(updatedCheckboxes);
        onGetCheckBox(updatedCheckboxes?.filter((item) => item.checked));
    };

    return (
        <Card direction="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="25px" mb="10px" align="center">
                {optionsHeader}
            </Flex>
            <Flex overflow="auto">
                <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
                    <Thead>
                        {headerGroups.map((headerGroup, index) => (
                            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup?.headers?.map((column, index) => (
                                    <Th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        pe="10px"
                                        key={index}
                                        borderColor={borderColor}
                                        minW={column?.width}
                                        maxW={column?.width}
                                    >
                                        <Flex
                                            justify="space-between"
                                            align="center"
                                            fontSize={{ sm: '14px', lg: '14px' }}
                                            color="gray.400"
                                        >
                                            {(column?.type === 'string' ||
                                                column?.type === 'action' ||
                                                column?.type === 'date') &&
                                                column.render('Header')}
                                            {column?.type === 'checkbox' && (
                                                <>
                                                    {column.render('Header')}
                                                    <Checkbox
                                                        onChange={(event) => {
                                                            handleCheckAll(event.target.checked);
                                                        }}
                                                        isChecked={
                                                            isNonEmptyArray(checked) &&
                                                            checked.every((checkbox) => checkbox?.checked)
                                                        }
                                                        colorScheme="brandScheme"
                                                        me="10px"
                                                        style={{ marginLeft: '10px' }}
                                                    />
                                                </>
                                            )}
                                        </Flex>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page?.map((row, index) => {
                            prepareRow(row);

                            return (
                                <Tr {...row.getRowProps()} key={index}>
                                    {row.cells.map((cell, index) => {
                                        // console.log(cell);
                                        let data = '';
                                        if (cell.column?.type === 'string') {
                                            data = (
                                                <Text color={textColor} fontSize="sm" fontWeight="500">
                                                    {cell?.row?.original[cell?.column?.key]}
                                                </Text>
                                            );
                                        } else if (cell.column.type === 'date') {
                                            data = (
                                                <Flex align="center" justifyContent={'center'}>
                                                    <Text color={textColor} fontSize="sm" fontWeight="700">
                                                        {moment(cell?.row?.original[cell?.column?.key])?.format(
                                                            'DD/MM/YYYY',
                                                        )}
                                                    </Text>
                                                </Flex>
                                            );
                                        } else if (cell.column.key === 'PROGRESS') {
                                            data = (
                                                <Flex align="center">
                                                    <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                                        {cell.value}%
                                                    </Text>
                                                    <Progress
                                                        variant="table"
                                                        colorScheme="brandScheme"
                                                        h="8px"
                                                        w="63px"
                                                        value={cell.value}
                                                    />
                                                </Flex>
                                            );
                                        } else if (cell.column.key === 'checkbox') {
                                            data = (
                                                <Flex align="center" justifyContent={'center'}>
                                                    <Checkbox
                                                        onChange={() => {
                                                            handleCheckboxChange(cell?.row?.original?._id);
                                                        }}
                                                        isChecked={
                                                            checked?.find(
                                                                (item) => item._id === cell?.row?.original?._id,
                                                            )?.checked
                                                        }
                                                        colorScheme="brandScheme"
                                                        me="10px"
                                                    />
                                                </Flex>
                                            );
                                        } else if (cell.column.key === 'action') {
                                            data = (
                                                <Flex align="center">
                                                    {actions?.map((item, i) => {
                                                        if (item?.type === 'delete') {
                                                            return (
                                                                <Tooltip label={item.type} key={i}>
                                                                    <DeleteIcon
                                                                        color={'red.500'}
                                                                        me="16px"
                                                                        h="18px"
                                                                        w="18px"
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => {
                                                                            onDelete([cell?.row?.original?._id]);
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            );
                                                        }

                                                        // if (item?.type === 'add') {
                                                        //     return (
                                                        //         <Tooltip label={item.type} key={i}>
                                                        //             <AddIcon
                                                        //                 color={'green.500'}
                                                        //                 me="16px"
                                                        //                 h="18px"
                                                        //                 w="18px"
                                                        //                 style={{ cursor: 'pointer' }}
                                                        //                 onClick={() => {
                                                        //                     onAdd(item.type);
                                                        //                 }}
                                                        //             />
                                                        //         </Tooltip>
                                                        //     );
                                                        // }

                                                        if (item?.type === 'edit') {
                                                            return (
                                                                <Tooltip label={item.type} key={i}>
                                                                    <EditIcon
                                                                        color={'blue.500'}
                                                                        me="16px"
                                                                        h="18px"
                                                                        w="18px"
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => {
                                                                            onEdit(cell?.row?.original);
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            );
                                                        }
                                                    })}
                                                </Flex>
                                            );
                                        }
                                        return (
                                            <Td
                                                {...cell.getCellProps()}
                                                key={index}
                                                fontSize={{ sm: '14px' }}
                                                minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                                borderColor="transparent"
                                            >
                                                {data}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Flex>

            {isPagination && (
                <Flex justifyContent="flex-end" m={4} alignItems="center">
                    <Flex>
                        <Tooltip label="First Page">
                            <IconButton
                                onClick={() => {
                                    gotoPage(1);
                                    onGoToFirstPage();
                                }}
                                isDisabled={!paginationData?.hasPrevPage}
                                icon={<ArrowLeftIcon h={3} w={3} />}
                                mr={4}
                            />
                        </Tooltip>
                        <Tooltip label="Previous Page">
                            <IconButton
                                onClick={() => {
                                    previousPage();
                                    onPrevPage();
                                }}
                                isDisabled={!paginationData?.hasPrevPage}
                                icon={<ChevronLeftIcon h={6} w={6} />}
                            />
                        </Tooltip>
                    </Flex>

                    <Flex alignItems="center">
                        <Text flexShrink="0" mr={8}>
                            Page{' '}
                            <Text fontWeight="bold" as="span">
                                {paginationData?.currentPage}
                            </Text>{' '}
                            of{' '}
                            <Text fontWeight="bold" as="span">
                                {paginationData?.totalPages}
                            </Text>
                        </Text>

                        <Select
                            w={32}
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                onChangePageSize(Number(e.target.value));
                            }}
                        >
                            {pageSizeOptions.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </Select>
                    </Flex>

                    <Flex>
                        <Tooltip label="Next Page">
                            <IconButton
                                onClick={(e) => {
                                    nextPage();
                                    onNextPage();
                                }}
                                isDisabled={!paginationData?.hasNextPage}
                                icon={<ChevronRightIcon h={6} w={6} />}
                            />
                        </Tooltip>
                        <Tooltip label="Last Page">
                            <IconButton
                                onClick={() => {
                                    gotoPage(paginationData?.totalPages);
                                    onGoToLastPage();
                                }}
                                isDisabled={!paginationData?.hasNextPage}
                                icon={<ArrowRightIcon h={3} w={3} />}
                                ml={4}
                            />
                        </Tooltip>
                    </Flex>
                </Flex>
            )}
        </Card>
    );
}
