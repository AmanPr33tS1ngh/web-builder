import React from 'react';
import './App.css';
import Editor from "./Components/Editor/Editor";
import {
  BrowserRouter as Router,
  Route,
  Routes} from 'react-router-dom';
import PageHandler from "./Components/PageHandler/PageHandler";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Routes>
                <Route path={'/'} Component={Editor}/>
                <Route path={'/pages'} Component={PageHandler}/>
                <Route path={'/editor/:id'} Component={Editor}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
