import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';
const API_URL = `${BASE_URL}api/auth/`;


const useAuthStore = create(
    (set) => ({
        user: null,
        isAuthenticated: !!localStorage.getItem('access_token'),
        isLoading: false,
        error: null,

        login: async(username, password) => {
            set({
                isLoading : true,
                error: null,    
            })

            try{
                const response = await axios.post(`${API_URL}login/`, {
                    username: username,
                    password: password,
                });

                const {access, refresh} = response.data.tokens;

                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                set({ isAuthenticated: true, isLoading: false, error: null });
                return true;
            }
            catch(err){
                const errorMessage = err.response?.data?.error || "Login Failed";
                set({ error: errorMessage, isLoading: false });
                return false;
            }
        },


        sign_up: async(username, email, password) => {
            set({
                isLoading : true,
                error: null,
            })

            try{
                const response = await axios.post(`${API_URL}signup/`, {
                    username: username,
                    password: password,
                    email: email,
                });
            

                set({
                    isLoading : false,
                    error: null,
                })

                return true;
            }catch(err){
                const errorMessage = err.response?.data?.error || "Sign Up Failed";
                set({ error: errorMessage, isLoading: false });
                return false;
            }
        },


        changePassword: async(username, new_password, old_password) => {
            set({
                isLoading : true,
                error: null,
            })
            try{
                const token = localStorage.getItem('access_token');

                const response = await axios.put(
                    `${API_URL}change-password/`, {
                        old_password: old_password,
                        new_password: new_password,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` } // <--- CRITICAL
                    }
                );

                set({ isLoading: false, error: null });

                return true;
                
            }catch(err){
                const errorMessage = err.response?.data?.error || "Password Change Failed";
                set({ error: errorMessage, isLoading: false });
                return false;
            }

        },

        logout: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            set({ isAuthenticated: false, user: null });
        }

    })
)