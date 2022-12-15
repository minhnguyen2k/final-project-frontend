import React, { FC, useEffect } from 'react';
import { Box, Button, Paper, Pagination } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AddCircleOutline } from '@mui/icons-material';
import { TableOptions, useGlobalFilter, usePagination, useTable } from 'react-table';
import GlobalFilter from './GlobalFilter';
import { useNavigate } from 'react-router-dom';

interface Props extends TableOptions<any> {
  createPath?: string;
  isDeleteDone?: boolean;
}

const FMTable: FC<Props> = ({ columns, data, createPath, isDeleteDone }) => {
  // const skipPageResetRef = React.useRef(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    dispatch,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    preGlobalFilteredRows,
    setGlobalFilter,
    actions,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      // autoResetPage: false,
      // autoResetGlobalFilter: true,
      // autoResetFilters: skipPageResetRef.current,
    },
    useGlobalFilter,
    usePagination,
  );

  // useEffect(() => {
  //   dispatch({ type: actions.resetPage });
  // }, [globalFilter]);

  useEffect(() => {
    setPageSize(5);
  }, []);

  return (
    <Paper elevation={2} className={classes.container}>
      <Box className={classes.tableToolsWrapper}>
        <GlobalFilter
          isDeleteDone={isDeleteDone!}
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        {createPath && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => {
              navigate(createPath);
            }}
          >
            Add New
          </Button>
        )}
      </Box>

      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <TableRow key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <TableCell key={key} {...restColumn}>
                      {column.render('Header')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <TableRow key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <TableCell key={key} {...restCellProps} size="small">
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>

      <Pagination
        className={classes.pagination}
        count={pageOptions.length}
        page={pageIndex + 1}
        onChange={(event, value) => {
          gotoPage(value - 1);
        }}
      />
    </Paper>
  );
};

export default FMTable;

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
    pagination: {
      marginTop: '10px',
    },
    tableToolsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '10px 0 20px 0',
    },
  }),
);
