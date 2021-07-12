import React from 'react'
import './Login.css'
import * as Keycloak from 'keycloak-js'

export default function Login() {

    // function keycloakInit() {
    //     var keycloak = new Keycloak({
    //         url: 'https://databus.dbpedia.org/auth/',
    //         realm: 'databus',
    //         clientId: 'dbpedia-dashboard',
    //         onLoad: 'login-required'
    //     })

    //     keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
    //         console.log(authenticated);
    //     }).catch(() => {
    //         console.log("failed")
    //     })
    // }

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
            <span className="material-icons md-48 md-light align-middle" >
                account_circle
            </span>
        </>
    )
}
