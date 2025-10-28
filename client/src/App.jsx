import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Home from './components/home.jsx';

function App() {

  return (
    <>
      <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className='navbar-brand' to="/">My Portfolio</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className='nav-link' to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/contact">Contact</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">Register</li>
              <li className="nav-item">Login</li>
            </ul>
          </div>
        </nav>
      </div>

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
