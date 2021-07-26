import React, { useEffect }from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as Keycloak from 'keycloak-js'

// const keycloakInit = () => {
//   var keycloak = new Keycloak({
//       url: 'https://databus.dbpedia.org/auth/',
//       realm: 'databus',
//       clientId: 'dbpedia-dashboard',
//       onLoad: 'login-required'
//   })

//   keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
//       console.log(authenticated);
//   }).catch(() => {
//       console.log("failed")
//   })
// }

// useEffect(keycloakInit, [])

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
