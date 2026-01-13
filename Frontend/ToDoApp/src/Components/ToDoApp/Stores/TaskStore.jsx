import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';
const API_URL = `${BASE_URL}api/todo/`;

const useTaskStore = create(
    (set,get) => ({
        tasks : [],
        isLoading : false,
        error : null,

        fetchTasks : async() => {
            set({isLoading: true});
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`${API_URL}read_task/`, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                set({tasks: response.data, isLoading : false});
                
            }catch(err){
                set({error: err.message, isLoading: false});
            }
        },

        addTask : async(taskTitle) =>{
            set({isLoading: true});
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.post(`${API_URL}create_task`, 
                    { task: taskTitle },
                    { headers: {Authorization: `Bearer ${token}`} },
                );

                await get().fetchTasks();

                set({ isLoading: false });
                return true;


            }catch(err){
                const errorMessage = err.response?.data?.error || "Failed to add task";
                set({ error: errorMessage, isLoading: false });
                return false;
            }

        },

        editTask : async(task_id, taskTitle, is_done_status) =>{
            set({isLoading: true});
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.put(`${API_URL}update_task`, 
                    { 
                        task: taskTitle,
                        task_id: task_id,
                        is_done: is_done_status
                    },
                    { headers: {Authorization: `Bearer ${token}`} },
                );

                await get().fetchTasks();

                set({ isLoading: false });
                return true;


            }catch(err){
                const errorMessage = err.response?.data?.error || "Failed to update task";
                set({ error: errorMessage, isLoading: false });
                return false;
            }

        },


    })
);

export default useTaskStore;