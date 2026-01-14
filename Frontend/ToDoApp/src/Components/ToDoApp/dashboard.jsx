import Filters from "./components/Filters";
import TaskEntry from "./components/TaskEntry";
import Lists from "./components/TaskList";

import useAuthStore from '../Authentication/Stores/AuthStore'

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout()

        navigate('/login'); // Force the screen change immediately
    };

    return (
        <>
            <TaskEntry />
            <Filters />
            <Lists />

            <button 
                onClick={() => {handleLogout()}}
            >
                LogOut
            </button>
        </>
    )
}

export default Dashboard;