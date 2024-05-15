import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import ConfigForm from './components/admin/ConfigForm';
import ConfigFromEdit from './components/admin/configFromEdit';
import ConfigList from './components/admin/ConfigList';
import Login from './components/auth/Login';
import { PrivateRoute, refreshToken } from './components/auth/PrivateRoute';
import config from './config.json'
import AdminVote from './components/admin/AdminVote';

const App = () => {
  const [isLogin, setIslogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("refresh")) {
        await refreshToken(config.doamin);
      }
    };
    fetchData();

    let intervalId;
    // Kiểm tra trạng thái đăng nhập trước khi thiết lập interval
    if (isLogin) {
      intervalId = setInterval(() => {
        refreshToken();
      }, 180000); // 3 phút
    }

    return () => {
      // Xóa interval khi component unmount
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLogin]); // Phụ thuộc vào isLogin để quản lý interval
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/admin/addconfig" element={<PrivateRoute domain={config.doamin} />}>
            <Route exact path="/admin/addconfig" element={<ConfigForm/>} />
          </Route>
          <Route exact path="/admin/edit/:id" element={<PrivateRoute domain={config.doamin} />}>
            <Route exact path="/admin/edit/:id" element={<ConfigFromEdit/>} />
          </Route>
          <Route exact path="/admin/config" element={<PrivateRoute domain={config.doamin} />}>
            <Route exact path="/admin/config" element={<ConfigList/>} />
          </Route>
          <Route exact path="/admin/vote" element={<PrivateRoute domain={config.doamin} />}>
            <Route exact path="/admin/vote" element={<AdminVote/>} />
          </Route>
          <Route exact path="/login" element={<Login/>} />
        </Routes>
    </Router>
);
};

export default App;
