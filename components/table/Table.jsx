import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import './table.scss'
import { TablePaginationActions, Dialog } from '@/components';
import Button from '@mui/material/Button';

function createData(foundation1, foundation2, foundation3 ,foundation4, date, time, ip, key) {
  return { foundation1, foundation2, foundation3, foundation4, date, time, ip, key };
}

export default function BasicTable(props) {

   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [page, setPage] = useState(0); 
   const [orderBy, setOrderBy] = useState('date');
   const [order, setOrder] = useState('asc');

  

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleSortRequest = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
      };

    const rows = props.tableData.map((data, index) => {
        return createData(
          data.szent_istvan_kiraly_zenei_alapitvany,
          data.autizmus_alapitvany,
          data.elemiszer_bankegysulet,
          data.lampas_92_alapitvany,
          data.date,
          data.time,
          data.ip,
          index
        );
      });

      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
      function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
          : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
      }
      
      function descendingComparator(a, b) {
        if (b < a) return -1;
        if (b > a) return 1;
        return 0;
      }

      const sortedRows = stableSort(rows, getComparator(order, orderBy));

   
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">SZENT ISTVÁN KIRÁLY ZENEI ALAPÍTVÁNY</TableCell>
            <TableCell align="center">AUTIZMUS ALAPÍTVÁNY</TableCell>
            <TableCell align="center">ÉLELMISZERBANK EGYESŰLET</TableCell>
            <TableCell align="center">LÁMPÁS 92 ALAPÍTVÁNY</TableCell>
            <TableCell align="center">
              <div className='dateCell' onClick={() => handleSortRequest('date')}>
                DATE
              {orderBy === 'date' && (
                <span>
                  {order === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </span>
              )}
              </div>
            </TableCell>
            <TableCell align="center">TIME</TableCell>
            <TableCell align="center">IP</TableCell>
            <TableCell align="center">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ).map((row) => (
            <TableRow key={row.key}>
              <TableCell align="center">
                {row.foundation1}
              </TableCell>
              <TableCell align="center">
                {row.foundation2}
              </TableCell>
              <TableCell align="center">
                {row.foundation3}
              </TableCell>
              <TableCell align="center">
                {row.foundation4}
              </TableCell>
              <TableCell align="center">
                {row.date}
              </TableCell>
              <TableCell align="center">
                {row.time}
              </TableCell>
              <TableCell align="center">
                {row.ip}
              </TableCell>
              <TableCell align="center">
                <Dialog onDelete={() => {props.onDelete(row.key)}}/>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TablePagination
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}