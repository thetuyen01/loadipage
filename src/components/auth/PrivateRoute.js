import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';


const PrivateRoute = ({domain}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const auth = await refreshToken(domain);
                setIsAuthenticated(auth);
            } catch (error) {
                console.error('Error refreshing token:', error);
                setIsAuthenticated(false); // Xử lý lỗi bằng cách đặt isAuthenticated thành false
            } finally {
                setLoading(false); // Đặt loading thành false khi kiểm tra hoàn tất, bất kể kết quả
            }
        };
        
        checkAuth();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}



const refreshToken = async (domain) => {
    console.log(domain)
    try {
      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        return false;
      }
  
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const requestBody = {
        refresh,
      };
  
      const response = await axios.post(`${domain}/api/token/refresh/`, requestBody, requestOptions);
  
      if (response.status !== 200) {
        return false;
      }
  
      localStorage.setItem('access', response.data.access);
      return true;
    } catch (error) {
      localStorage.removeItem('refresh')
      localStorage.removeItem('access')
    }
  };


export  {
    PrivateRoute,
    refreshToken
};
const Loading = () => {
    return <div>Loading...</div>;
};
