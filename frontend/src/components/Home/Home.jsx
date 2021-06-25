import React from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Home() {

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: "#282c34",
            color: theme.palette.common.white,
            fontSize: 16
        },
        body: {
            fontSize: 16,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.action.hover,
        },
    }))(TableRow);

    function createData(name, dateCreated, status) {
        return { name, dateCreated, status };
    }

    const rows = [
        createData('Ontologies', "20th June, 2020", "Published"),
        createData('Sports', "20th June, 2021", "Draft"),
    ];

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const classes = useStyles();

    return (
        <div>
            <Link to='/canvas'>
                <button className='btn btn-info p-1 pr-3 m-4'>
                    <span className="material-icons md-48 md-dark align-middle">
                        add
                    </span>
                    <span>New Dashboard</span>
                </button>
            </Link>

            <div class="m-4">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Date Created</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.dateCreated}</StyledTableCell>
                                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </div>
    )
}
