import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Home from "./components/Home/Home";
import Canvas from "./components/Canvas/Canvas";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <div>
          <nav className="navbar navbar-light bg-dark">
            <div className="container">
              <div className="navbar-brand">
                <Link to="/">
                  <img src="./dbpedia32.png" alt="" width="32" height="32" />
                </Link>
                <span className="text-white align-middle p-2">DBpedia Visualization Platform</span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/canvas/:dashboard">
          <Canvas />
        </Route>
      </Switch>
    </Router >

  );
}

export default App;
