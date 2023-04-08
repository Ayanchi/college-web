import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { database } from '../../../app/firebase';
import { Link } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#33691e',
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));


export default function IdeaTable(props) {

    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        const getFormList = async() => {
            try {
                const q = query(collection(database, "users"))
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setUsersData(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    return(
        <div className="usersTable" style={{margin:"30 px"}}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 0 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">№</StyledTableCell>
                            <StyledTableCell>Участник</StyledTableCell>
                            <StyledTableCell>Почта</StyledTableCell>
                            <StyledTableCell align="center">Баллы</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData?.map((row, index) => (
                            <StyledTableRow key={row.email}>
                                {row?.link 
                                ?(
                                    <>
                                    <StyledTableCell align="center">
                                        <Link to={`/college-web/user/${row?.link}`}>
                                            {index + 1}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link to={`/college-web/user/${row?.link}`}>
                                            {
                                            row?.name 
                                                ? row?.name + ' ' + row?.surename
                                                : 'Без имени'
                                            }
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Link to={`/college-web/user/${row?.link}`}>
                                            {row?.id}
                                        </Link> 
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Link to={`/college-web/user/${row?.link}`}>
                                            0
                                        </Link>
                                    </StyledTableCell>
                                    </>
                                    
                                )
                                : (
                                    <>
                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        {
                                        row?.name 
                                            ? row?.name + ' ' + row?.surename
                                            : 'Без имени'
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row?.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">0</StyledTableCell>
                                    </>
                                )
                            }
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}