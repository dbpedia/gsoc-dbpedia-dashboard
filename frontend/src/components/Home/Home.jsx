import React, { useState } from 'react'
import './Home.css'
import ReactDOM from "react-dom";
import { Modal, Form } from "react-bootstrap";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom"


export default function Home() {

    const [loginFormShow, setLoginFormShow] = useState(false);

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

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const classes = useStyles();

    const createData = (name, dateCreated, status) => {
        return { name, dateCreated, status };
    }

    const setDate = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let currentDate = new Date()
        let formattedDate = currentDate.getDate() + "/" + months[currentDate.getMonth()] + "/" + currentDate.getFullYear()
        return formattedDate
    }

    var records = [
        createData('Ontologies', setDate(), "Published"),
        createData('Sports', setDate(), "Draft"),
    ];

    const [rows, setRows] = useState(records);

    const addDashboardToList = (event) => {
        event.preventDefault();
        let dashboardNameElement = document.getElementById("dashboardName");
        if (dashboardNameElement != null) {
            let dashboardName = dashboardNameElement.value;
            if (dashboardName && dashboardName.trim().length > 0) {
                records = records.concat(createData(dashboardName.trim(), setDate(), "Draft"))
                setRows(records);
                setLoginFormShow(false)
            }
        }
    }

    const handleRecord = (record) => {
        console.log(record);
    }

    return (
        <div>
            <button className='btn btn-info p-1 pr-3 m-4' onClick={() => setLoginFormShow(true)}>
                <span className="material-icons md-48 md-dark align-middle">
                    add
                </span>
                <span>New Dashboard</span>
            </button>
            {/* <Link to='/canvas'> */}

            {/* </Link> */}

            <div className="m-4">
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
                                <StyledTableRow key={row.name} onClick={() => handleRecord(row)}>
                                    <StyledTableCell component="th" scope="row">
                                        <Link to={`/canvas/${row.name}`}>
                                            {row.name}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.dateCreated}</StyledTableCell>
                                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setLoginFormShow(false)}
                show={loginFormShow}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div>
                            <img src="./dbpedia32.png" alt="" width="32" height="32" />
                            <span className="text-white align-middle p-2">New Dashboard</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Dashboard Name" id="dashboardName" />
                        </Form.Group>
                        <button className="btn" id="btn-login" onClick={(event) => addDashboardToList(event)}>
                            <span className="p-2">Create</span>
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    )

}
