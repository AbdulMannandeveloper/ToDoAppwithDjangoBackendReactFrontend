import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import ChangePassword from './Components/Authentication/ChangePassword';
import Dashboard from './Components/ToDoApp/dashboard';

import useAuthStore from './Components/Authentication/Stores/AuthStore';

function App() {
  console.log('Entered in the App');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />

        <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
            path="/signup" 
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />} 
        />

        <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        
        <Route 
            path="/ChangePassword" 
            element={<ChangePassword />} 
        />

        <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;