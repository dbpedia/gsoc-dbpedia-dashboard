import React, { useState } from 'react'
import './Canvas.css'
import { Modal, Form, Row, Col } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { Container, } from '@material-ui/core';

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

    const classes = useStyles();
    const [isDisabled, setIsDisabled] = useState(false);
    const [loginFormShow, setLoginFormShow] = useState(false);
    const endpointField = React.useRef()
    const endpointActionBtn = React.useRef()
    const addBlockBtn = React.useRef()
    const query = React.useRef()

    const showBlock = (event) => {
        // setValue(event.target.value);
    };

    const endpointAction = () => {
        let sparqlEndpoint = endpointField.current.value
        if (sparqlEndpoint && sparqlEndpoint.trim().length > 0) {
            let status = endpointActionBtn.current.innerHTML
            if (status === "Save Endpoint") {
                localStorage.setItem('userid', 'karan@dbpedia.org')
                axios.post('/saveendpoint', {
                    "userid": localStorage.getItem('userid'),
                    "endpoint": sparqlEndpoint.trim()
                })
                setIsDisabled(true)
                endpointActionBtn.current.innerHTML = "Edit Endpoint"
            } else {
                setIsDisabled(false)
                endpointActionBtn.current.innerHTML = "Save Endpoint"
            }
        }
    }

    return (
        <div>
            <span className={classes.root}>
                <TextField
                    id="endpointField"
                    inputRef={endpointField}
                    label="SPARQL Endpoint"
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
                        <button ref={query} style={{ width: "9%" }} className="btn btn-info m-3">
                            Execute
                        </button>
                    </span>
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
