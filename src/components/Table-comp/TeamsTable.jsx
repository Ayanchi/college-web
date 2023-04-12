import { useState, useEffect } from "react"
import { database } from "../../app/firebase"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDocs, collection, query } from 'firebase/firestore';
import { styled } from '@mui/material/styles';


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

export default function TeamsTable(props){

    const [team, setTeam] = useState([])
    const [searchElem, setSearchElem] = useState('')
    const [searcherResult, setSearcherResult] = useState([])


    useEffect(() => {
        const getFormList = async() => {
            try {
                const q = query(collection(database, "teams"))
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setTeam(filterForm)
                console.log(setTeam)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    useEffect(() => {
        const search = searchElem
        const filter_array = team.filter(elem => {
            const lowerCaseSearch = search.toLowerCase()
            const lowerCaseTeamName = String(elem.teamName).toLowerCase()
            
            return lowerCaseTeamName.includes(lowerCaseSearch)
        })
        setSearcherResult(filter_array)
    }, [searchElem])

    return(
        <div className="teamsTable" style={{padding:"40px"}}>
            <div className="search">
                <input 
                    className='search-input' 
                    name="search" 
                    placeholder="Поиск" 
                    value={searchElem}
                    onChange={(e) => setSearchElem(e.target.value)}
                />
            </div>
            <br />
            <TableContainer component={Paper} sx={{borderRadius: '20px'}}>
                <Table sx={{ minWidth: 0 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">№</StyledTableCell>
                            <StyledTableCell>Участник</StyledTableCell>
                            <StyledTableCell align="center">Баллы</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searcherResult.length == 0 && team?.map((row, index) => (
                            <StyledTableRow key={row.author}>
                                
                                <StyledTableCell align="center">
                                        {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                        {
                                        row?.teamName ? row?.teamName : 'Без имени'
                                        }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                        0
                                </StyledTableCell>
                                    
                            </StyledTableRow>
                        ))}

                        {searcherResult.length > 0 && searcherResult?.map((row, index) => (
                            <StyledTableRow key={row.author}>
                                
                                <StyledTableCell align="center">
                                        {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                        {
                                        row?.teamName ? row?.teamName : 'Без имени'
                                        }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                        0
                                </StyledTableCell>
                                    
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
    
}