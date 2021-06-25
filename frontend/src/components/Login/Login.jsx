import React, { useState } from 'react'
import { Modal, Form } from "react-bootstrap";
import './Login.css'
import * as Keycloak from 'keycloak-js'

export default function Login() {

    const [loginFormShow, setLoginFormShow] = useState(false);

    function keycloakInit() {
        var keycloak = new Keycloak({
            url: 'https://databus.dbpedia.org/auth/',
            realm: 'databus',
            clientId: 'dbpedia-dashboard',
            onLoad: 'login-required'
        })

        keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
            console.log(authenticated);
        }).catch(() => {
            console.log("failed")
        })
    }

    // localStorage.setItem("react-token", keycloak.token);
    // localStorage.setItem("react-refresh-token", keycloak.refreshToken);
    // setTimeout(() => {
    //     keycloak.updateToken(70).success((refreshed) => {
    //         if (refreshed) {
    //             console.debug('Token refreshed' + refreshed);
    //         } else {
    //             console.warn('Token not refreshed, valid for '
    //                 + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
    //         }
    //     }).error(() => {
    //         console.error('Failed to refresh token');
    //     });


    // }, 60000)

    return (
        <>
            {/* <span className="material-icons md-48 md-light align-middle" onClick={() => setLoginFormShow(true)}> */}
            <span className="material-icons md-48 md-light align-middle" onClick={() => keycloakInit()}>
                account_circle
            </span>

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
                            <span className="text-white align-middle p-2">DBpedia Login</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                    <button className="btn" type="submit" id="btn-login">
                        <span className="p-2">Login</span>
                    </button>
                </Modal.Body>
            </Modal>
        </>
    )
}
