import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/login';
import Upload from './component/upload';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Login />} />
                <Route path='upload' element={<Upload />} />
            </Routes>
        </Router>
  );
}

export default App;
