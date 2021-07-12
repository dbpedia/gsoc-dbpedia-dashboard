import React, { useState, useEffect } from 'react'
import './Canvas.css'
import { Modal, Form, Row, Col } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { TextField, Container, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

export default function Canvas() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }));

    const params = useParams();
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);
    const [loginFormShow, setLoginFormShow] = useState(false);
    const endpointField = React.useRef()
    const endpointActionBtn = React.useRef()
    const addBlockBtn = React.useRef()
    const query = React.useRef()
    const [columns, setColumns] = useState([]);
    const [chartType, setChartType] = useState("")

    const loadDashboard = () => {
        localStorage.setItem('userid', 'karan@dbpedia.org')
        localStorage.setItem('currentdashboard', 'sports')
        axios.post('/getdashboard', {
            "user_id": localStorage.getItem("userid"),
            "dashboard_name": params['dashboard']
        }).then((response) => {
            let data = response["data"]
            if (data["status"] === true) {
                let responseDashboard = data["dashboard"]
                let responseEndpoint = responseDashboard["endpoint"]
                if (responseEndpoint.length > 0) {
                    endpointField.current.label = ""
                    endpointField.current.value = responseEndpoint
                    endpointActionBtn.current.innerHTML = "Edit Endpoint"
                    setIsDisabled(true)
                } else {
                    endpointField.current.label = "SPARQL Endpoint"
                    endpointActionBtn.current.innerHTML = "Save Endpoint"
                    setIsDisabled(false)
                }
            }
            // loadBlocks()
        })
    }

    useEffect(loadDashboard, [])

    const endpointAction = () => {
        let sparqlEndpoint = endpointField.current.value
        if (sparqlEndpoint && sparqlEndpoint.trim().length > 0) {
            let status = endpointActionBtn.current.innerHTML
            if (status === "Save Endpoint") {
                localStorage.setItem('userid', 'karan@dbpedia.org')
                localStorage.setItem('currentdashboard', 'sports')
                axios.post('/saveendpoint', {
                    "userid": localStorage.getItem('userid'),
                    "dashboard_name": params['dashboard'],
                    "endpoint": sparqlEndpoint.trim()
                }).then((response) => {
                    setIsDisabled(true)
                    endpointActionBtn.current.innerHTML = "Edit Endpoint"
                })
            } else {
                setIsDisabled(false)
                endpointActionBtn.current.innerHTML = "Save Endpoint"
            }
        }
    }

    const executeQuery = () => {
        let sparqlQuery = query.current.value
        localStorage.setItem('userid', 'karan@dbpedia.org')
        if (sparqlQuery && sparqlQuery.trim().length > 0) {
            axios.post("/executequery", {
                "userid": localStorage.getItem("userid"),
                "dashboard_name": params['dashboard'],
                "sparql_query": sparqlQuery.trim()
            }).then((response) => {
                let data = response["data"]
                let responseRows = []
                let responseColumns = []
                if (data["status"] === true) {
                    for (var i = 0; i < data["columns"].length; i++) {
                        responseColumns.push({
                            field: data["columns"][i],
                            headerName: data["columns"][i],
                            width: "100%"
                        })
                    }
                    for (var i = 0; i < data["data"].length; i++) {
                        let rowData = data["data"][i]
                        rowData['id'] = i
                        responseRows.push(rowData)
                    }
                }
                setColumns(responseColumns)
                setRecords(responseRows)
            })
        }
    }

    const handleChange = (event) => {
        setChartType(event.target.value);
      };

    return (
        <div>
            <span className={classes.root}>
                <TextField
                    id="endpointField"
                    inputRef={endpointField}
                    style={{ margin: 8, width: "76%" }}
                    margin="normal"
                    variant="outlined"
                    color="primary"
                    disabled={isDisabled}
                />
                <button ref={endpointActionBtn} style={{ margin: 8, width: "10%" }} className="btn btn-info"
                    onClick={() => endpointAction()}>
                    Save Endpoint
                </button>
                <button ref={addBlockBtn} style={{ margin: 8, width: "10%" }} className="btn btn-success"
                    onClick={() => setLoginFormShow(true)}>
                    Add Block
                </button>
            </span>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                onHide={() => setLoginFormShow(false)}
                dialogClassName="modal-90w"
                show={loginFormShow}
                backdrop="static"
                keyboard="false">
                <Modal.Body className={"modal-body-spacing"}>

                    {/* SPARQL query text field */}
                    <span className={classes.root}>
                        <TextField
                            inputRef={query}
                            label="SPARQL Endpoint"
                            style={{ width: "88%" }}
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            size="small"
                        />
                        <button style={{ width: "9%" }} className="btn btn-info m-3"
                            onClick={() => executeQuery()}>
                            Execute
                        </button>
                    </span>

                    {/* Table to display the output of SPARQL query execution */}
                    <div style={{ height: 250, width: "100%" }}>
                        <DataGrid
                            rows={records}
                            columns={columns}
                            pageSize={5} />
                    </div>

                    {/* Visualization Controller */}
                    <Container>
                        <Row className="justify-content-md-center">
                            <FormControl style={{width: "20%"}}>
                                <InputLabel>Chart Type</InputLabel>
                                <Select value={chartType} onChange={handleChange}>
                                    <MenuItem value={"Line"}>Line</MenuItem>
                                </Select>
                            </FormControl>
                        </Row>
                    </Container>

                    {/* Action Buttons */}
                    <Container>
                        <Row className="justify-content-md-center">
                            <button
                                style={{ width: "9%" }}
                                className="btn btn-danger m-3"
                                onClick={() => setLoginFormShow(false)}>
                                Cancel
                            </button>
                            <button style={{ width: "9%" }} className="btn btn-success m-3">
                                Save
                            </button>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

        </div>
    )
}
