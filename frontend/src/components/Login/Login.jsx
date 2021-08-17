import React, { Component, useEffect, useState } from 'react'
import './Login.css'
import Keycloak from 'keycloak-js'

class Login extends Component {

    componentDidMount() {

        const keycloak = new Keycloak({
            url: 'https://databus.dbpedia.org/auth/',
            realm: 'databus',
            clientId: 'dbpedia-dashboard',
            onLoad: 'login-required'
        })

        keycloak.init({ onLoad: 'login-required', flow: 'implicit' }).then((authenticated) => {
            localStorage.setItem('keycloak', keycloak)
            localStorage.setItem('authenticated', authenticated)
            console.log(keycloak)
            console.log(authenticated)
        })

    }

    render() {
        return (
            <></>
        )
    }
}
export default Login;
