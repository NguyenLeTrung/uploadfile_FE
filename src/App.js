import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/User/login';
// import Upload from './component/User/upload';
import BasicList from './component/User/upload';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Login />} />
                <Route path='upload' element={<BasicList />} />
            </Routes>
        </Router>
  );
}

export default App;
