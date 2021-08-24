import { Component, React, useEffect, useState } from 'react'
import './Main.css'
import { Card, Button } from 'react-bootstrap'
import Keycloak from 'keycloak-js'
import { Link } from "react-router-dom"

export default function Main() {

    const [universalKeycloak, setKeycloak] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("loginClicked") != null) {
            login()
        }
    }, [])

    const manageUserInfo = (keycloakObj, authenticated) => {
        if (authenticated) {
            console.log(keycloakObj)
            localStorage.setItem("userid", keycloakObj["tokenParsed"]["email"])
            setLoggedIn(true)
        } else {
            console.log("Authentication failed")
        }
    }

    const logoutAction = () => {
        if (universalKeycloak) {
            universalKeycloak.logout()
            localStorage.removeItem("userid")
            localStorage.removeItem('keycloak')
            localStorage.removeItem('authenticated')
            localStorage.setItem("loginClicked", null)
            setLoggedIn(false)
            setKeycloak(null)
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
            setKeycloak(keycloak)
            localStorage.setItem('keycloak', keycloak)
            localStorage.setItem('authenticated', authenticated)
            localStorage.setItem("loginClicked", false)
            manageUserInfo(keycloak, authenticated)
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
                        {
                            loggedIn ?
                                <div>
                                    <div className="text-center">
                                        <Link to="/home" className="login-button text-white p-2">
                                            Home
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Button className="login-button" onClick={() => logoutAction()}>Logout</Button>
                                    </div>
                                </div>
                                :
                                <div className="text-center">
                                    <Button className="login-button" onClick={() => login()}>Login</Button>
                                </div>
                        }
                    </Card.Body>
                </Card>
            </div>
        </div>


    )

}
