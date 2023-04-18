import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/User/login';
import Upload from './component/User/upload';
import SubFolder from './component/User/sub_folder';
import UserManagement from './component/Admin/dashbord';
import LoginAdmin from './component/Admin/login_admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Login />} />
                <Route path='admin' element={<LoginAdmin />} />
                <Route path='upload' element={<Upload />} />
                <Route path='sub_folder/:name' element={<SubFolder />} />
                <Route path='dashboard' element={<UserManagement />}/>
            </Routes>
        </Router>
  );
}

export default App;
