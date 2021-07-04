import React, { useState, useEffect } from 'react'
import './Home.css'
import { Modal, Form } from "react-bootstrap";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Checkbox } from '@material-ui/core';

export default function Home() {

    const wrapper = React.useRef()

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
            minWidth: 100,
        },
        headerCheckbox: {
            color: "#FFFFFF"
        },
        recordCheckbox: {
            color: "#282c34"
        }
    });

    const classes = useStyles();

    const [rows, setRows] = useState([]);

    const fetchRecords = () => {
        localStorage.setItem('userid', 'karan@dbpedia.org')
        axios.post('/getdashboards', {
            "userid": localStorage.getItem('userid')
        }).then((response) => {
            let records = []
            let data = response["data"]
            if (data["status"] === true) {
                for (var i = 0; i < data["dashboards"].length; i++) {
                    let dash = data["dashboards"][i]
                    records.push(dash)
                }
            } else {
                console.log("No dashboards found!")
            }
            console.log(records)
            setRows(records)
        })
    }

    useEffect(fetchRecords, [])

    const addDashboardToList = (event) => {
        event.preventDefault();
        localStorage.setItem('userid', 'karan@dbpedia.org')
        let dashboardName = wrapper.current.value;

        if (dashboardName && dashboardName.trim().length > 0) {
            axios.post(
                '/adddashboard', {
                "userid": localStorage.getItem('userid'),
                "dashboard_name": dashboardName.trim()
            }).then((response) => {
                let data = response["data"]
                if (data["status"] === true) {
                    console.log("dashboard added!")
                } else {
                    console.log("error in adding the dashboard")
                }
                setLoginFormShow(false)
                fetchRecords();
            })
        }
    }

    const handleRecord = (record) => {
        // console.log(record);
    }

    return (
        <div>
            <button className='btn btn-info p-1 pr-3 m-4' onClick={() => setLoginFormShow(true)}>
                <span className="material-icons md-48 md-dark align-middle">
                    add
                </span>
                <span>New Dashboard</span>
            </button>

            <div className="m-4">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Date Created</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Checkbox color="white" className={classes.headerCheckbox}></Checkbox>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map(row => (
                                    <StyledTableRow key={row.name} onClick={() => handleRecord(row)}>
                                        <StyledTableCell component="th" scope="row">
                                            <Link to={`/canvas/${row.name}`}>
                                                {row.name}
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.date_created}</StyledTableCell>
                                        <StyledTableCell align="right">{row.status}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Checkbox color="white" className={classes.recordCheckbox}></Checkbox>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
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
                            <Form.Control ref={wrapper} placeholder="Dashboard Name" />
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
