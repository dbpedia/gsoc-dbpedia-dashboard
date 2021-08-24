import React, { useState, useEffect } from 'react'
import './Canvas.css'
import { Modal, Row, Col, Spinner } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { TextField, Container, FormControl, Select, InputLabel, MenuItem, Paper, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import createPlotlyComponent from 'react-plotly.js/factory';
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";


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
        gridroot: {
            flexGrow: 1,
            margin: 8,
            width: "98%"
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        paperplot: {
            width: "100%",
            height: "300px"
        },
        loader: {
            position: 'absolute', left: '46%', top: '50%'
        }
    }));

    const Plotly = window.Plotly
    const Plot = createPlotlyComponent(Plotly);
    const params = useParams();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);
    const [loginFormShow, setLoginFormShow] = useState(false);
    const endpointField = React.useRef()
    const endpointActionBtn = React.useRef()
    const addBlockBtn = React.useRef()
    const [query, setQuery] = useState("")
    const [dashboardBlocks, setDashboardBlocks] = useState([])
    const [columns, setColumns] = useState([]);
    const [chartType, setChartType] = useState("")
    const [selectedLabel, setSelectedLabel] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [xValues, setxValues] = useState([])
    const [yValues, setyValues] = useState([])

    const loadDashboard = () => {
        axios.post('/getdashboard', {
            "user_id": localStorage.getItem("userid"),
            "dashboard_name": params['dashboard']
        }).then((response) => {
            setIsLoading(false)
            let data = response["data"]
            console.log(data)
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

                let blocksData = responseDashboard["blocks_data"]
                let blocks = responseDashboard["blocks"]
                let responseBlocks = []
                if (blocksData.length == blocks.length) {
                    for (let index = 0; index < blocksData.length; index++) {
                        let blockObj = {}
                        blockObj["chart_type"] = blocks[index]["chart_type"]
                        blockObj["selected_label"] = blocks[index]["selected_label"]
                        blockObj["selected_value"] = blocks[index]["selected_value"]
                        blockObj["selected_label_data"] = blocksData[index][blockObj["selected_label"]]
                        blockObj["selected_value_data"] = blocksData[index][blockObj["selected_value"]]
                        responseBlocks.push(blockObj)
                    }
                    console.log(responseBlocks)
                    setDashboardBlocks(responseBlocks)
                }
            }
        })
    }

    const endpointAction = () => {
        let sparqlEndpoint = endpointField.current.value
        if (sparqlEndpoint && sparqlEndpoint.trim().length > 0) {
            let status = endpointActionBtn.current.innerHTML
            if (status === "Save Endpoint") {
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

    const executeQuery = (qry) => {
        setQuery(qry)
        // let sparqlQuery = query.current.value
        if (qry && qry.trim().length > 0) {
            axios.post("/executequery", {
                "userid": localStorage.getItem("userid"),
                "dashboard_name": params['dashboard'],
                "sparql_query": qry
            }).then((response) => {
                let data = response["data"]
                let responseRows = []
                let responseColumns = []
                if (data["status"] === true) {
                    for (var i = 0; i < data["columns"].length; i++) {
                        responseColumns.push({
                            field: data["columns"][i],
                            headerName: data["columns"][i],
                            minWidth: "400px",
                            width: "500px"
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

    const handleChangeChartType = (event) => {
        setChartType(event.target.value);
    };

    const handleChangeSelectedLabel = (event) => {
        setSelectedLabel(event.target.value);
    };

    const handleChangeSelectedValue = (event) => {
        setSelectedValue(event.target.value);
    };

    const previewVisualization = () => {
        let xLabels = []
        let yValues = []
        for (let index = 0; index < records.length; index++) {
            xLabels.push(records[index][selectedLabel])
            yValues.push(records[index][selectedValue])
        }
        setxValues(xLabels)
        setyValues(yValues)
    }

    const saveBlock = () => {
        axios.post('/savedashboardblock', {
            "userid": localStorage.getItem("userid"),
            "dashboard_name": params['dashboard'],
            "sparql_query": query,
            "chart_type": chartType,
            "selected_label": selectedLabel.toString(),
            "selected_value": selectedValue.toString()
        }).then((response) => {
            let data = response["data"]
            if (data["status"] === true) {
                loadDashboard()
            } else {
                console.log("saving failed")
            }
            setColumns([])
            setRecords([])
            setLoginFormShow(false)
        })
    }

    const setupYasgui = () => {
        var loadYasgui = setInterval(() => {
            let yasguiBlock = document.getElementById("yasgui")
            if (yasguiBlock != null) {
                const yasgui = new Yasgui(yasguiBlock);
                let tab = yasgui.getTab();
                let yasqeOps = tab.getYasqe()
                let setOfColumns = [];
                yasqeOps.on("query", () => {
                    executeQuery(yasqeOps.getValueWithoutComments())
                })
                tab.setEndpoint(endpointField.current.value)
                killInterval(loadYasgui)
            }
        }, 100)

        const killInterval = (loadYasgui) => {
            clearInterval(loadYasgui)
        }

    }

    useEffect(() => {
        loadDashboard()
    }, [])

    return (
        <div>
            {
                isLoading ?
                    <div className={classes.loader}>
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                    </div>
                    :
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
                                onClick={() => {
                                    setColumns([])
                                    setRecords([])
                                    setupYasgui()
                                    setLoginFormShow(true)
                                }}>
                                Add Block
                            </button>
                        </span>

                        <div className={classes.gridroot}>
                            <Grid container spacing={3}>
                                {
                                    dashboardBlocks.map(dashboardBlock => (
                                        <Grid item lg={6}>
                                            <Paper className={classes.paper}>
                                                <Plot className={classes.paperplot}
                                                    data={[
                                                        {
                                                            type: dashboardBlock["chart_type"],
                                                            x: dashboardBlock["selected_label_data"],
                                                            y: dashboardBlock["selected_value_data"]
                                                        },
                                                    ]}

                                                />
                                            </Paper>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>

                        <Modal
                            aria-labelledby="contained-modal-title-vcenter"
                            onHide={() => setLoginFormShow(false)}
                            dialogClassName="modal-90w"
                            show={loginFormShow}
                            backdrop="static"
                            keyboard="false">
                            <Modal.Body className={"modal-body-spacing"}>

                                <div id="yasgui" />

                                {/* SPARQL query text field */}
                                {/* <span className={classes.root}>
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
                                </span> */}

                                {/* Table to display the output of SPARQL query execution */}
                                {/* <div style={{ height: 250, width: "100%" }}>
                                    <DataGrid
                                        rows={records}
                                        columns={columns}
                                        pageSize={5} />
                                </div> */}

                                {/* Visualization Controller */}
                                <Container>
                                    <Row className="justify-content-md-center">
                                        <Col className="justify-content-md-center">
                                            <Row>
                                                <FormControl style={{ width: "50%" }}>
                                                    <InputLabel>Chart Type</InputLabel>
                                                    <Select value={chartType} onChange={handleChangeChartType}>
                                                        <MenuItem value={"line"}>Line</MenuItem>
                                                        <MenuItem value={"bar"}>Bar</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Row>
                                            <Row>
                                                <FormControl style={{ width: "50%" }}>
                                                    <InputLabel>Labels</InputLabel>
                                                    <Select value={selectedLabel} onChange={handleChangeSelectedLabel}>
                                                        {
                                                            columns.map(column => (
                                                                <MenuItem value={column.headerName}>{column.headerName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Row>
                                            <Row>
                                                <FormControl style={{ width: "50%" }}>
                                                    <InputLabel>Values</InputLabel>
                                                    <Select value={selectedValue} onChange={handleChangeSelectedValue}>
                                                        {
                                                            columns.map(column => (
                                                                <MenuItem value={column.headerName}>{column.headerName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Plot
                                                data={[
                                                    {
                                                        type: chartType,
                                                        x: xValues,
                                                        y: yValues
                                                    },
                                                ]}
                                            />
                                        </Col>
                                    </Row>
                                </Container>

                                {/* Action Buttons */}
                                <Container>
                                    <Row className="justify-content-md-center">
                                        <button
                                            style={{ width: "9%" }}
                                            className="btn btn-danger m-3"
                                            onClick={() => {
                                                setColumns([])
                                                setRecords([])
                                                setLoginFormShow(false)
                                            }}>
                                            Cancel
                                        </button>
                                        <button style={{ width: "9%" }} className="btn btn-success m-3"
                                            onClick={() => saveBlock()}>
                                            Save
                                        </button>
                                        <button style={{ width: "9%" }} className="btn btn-dark m-3"
                                            onClick={() => previewVisualization()}>
                                            Preview
                                        </button>
                                    </Row>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </div>
            }
        </div>
    )
}
