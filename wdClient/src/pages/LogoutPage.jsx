import { authContext } from '../contexts/auth.context';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function LogoutPage() {

    const {isAuthenticated} = useContext(authContext);

    useEffect(()=>{
        localStorage.removeItem('authToken');
        isAuthenticated();
    }, []);

  return (
    <Navigate to="/login" />
  )
}
