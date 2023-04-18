import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/User/login';
import Upload from './component/User/upload';
import SubFolder from './component/User/sub_folder';
import UserManagement from './component/Admin/dashbord';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Login />} />
                <Route path='upload' element={<Upload />} />
                <Route path='sub_folder/:name' element={<SubFolder />} />
                <Route path='sub_folder/:name/:name' element={<SubFolder />} />
                <Route path='dashboard' element={<UserManagement />}/>
            </Routes>
        </Router>
  );
}

export default App;
