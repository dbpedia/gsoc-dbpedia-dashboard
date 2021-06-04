import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-dark">
        <div className="container">
          <div className="navbar-brand">
            <img src="./dbpedia32.png" alt="" width="32" height="32" />
            <span className="text-white align-middle p-2">DBpedia Visualization Platform</span>
          </div>
          <div>
            <Login/>
          </div>
        </div>
      </nav>
    </div>

  );
}

export default App;
