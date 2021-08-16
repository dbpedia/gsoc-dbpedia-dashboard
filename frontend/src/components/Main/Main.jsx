import {React, useEffect} from 'react'
import './Main.css'
import { Card, Button } from 'react-bootstrap'
import * as Keycloak from 'keycloak-js'

export default function Main() {

    var keycloak = new Keycloak({
        url: 'https://databus.dbpedia.org/auth/',
        realm: 'databus',
        clientId: 'dbpedia-dashboard',
        onLoad: 'login-required'
    })

    const keycloakInit = () => {        
        keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            console.log(authenticated)
        }).catch(() => {
            console.log("failed")
        })
    }

    // useEffect(keycloakInit, [])

    const login = () => {
        keycloakInit()
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
