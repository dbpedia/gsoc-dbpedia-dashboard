import { Component, React, useEffect, useState } from 'react'
import './Main.css'
import { Card, Button } from 'react-bootstrap'
import Keycloak from 'keycloak-js'

export default function Main() {

    useEffect(() => {
        if (localStorage.getItem("loginClicked") != null) {
            login()
        }
    }, [])

    const saveUserInfo = (keycloakObj, authenticated) => {
        if (authenticated) {
            console.log(keycloakObj)
            localStorage.setItem("userid", keycloakObj["tokenParsed"]["email"])
        } else {
            console.log("Authentication failed")
        }
    }

    const login = () => {
        const keycloak = new Keycloak({
            url: 'https://databus.dbpedia.org/auth/',
            realm: 'databus',
            clientId: 'dbpedia-dashboard',
            onLoad: 'login-required'
        })

        localStorage.setItem("loginClicked", true)

        keycloak.init({ onLoad: 'login-required', flow: 'implicit' }).then((authenticated) => {
            localStorage.setItem('keycloak', keycloak)
            localStorage.setItem('authenticated', authenticated)
            localStorage.setItem("loginClicked", false)
            saveUserInfo(keycloak, authenticated)
        })
    }

    return (

        <div className="text-center">
            <div>
                <Card className="welcome-card w-50">
                    <Card.Body>
                        <Card.Text>
                            Welcome to the DBpedia's visualization platform
                        </Card.Text>
                        <div className="text-center">
                            <Button className="login-button" onClick={() => login()}>Login</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>


    )

}
