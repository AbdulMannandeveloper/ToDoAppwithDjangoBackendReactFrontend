import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';
const API_URL = `${BASE_URL}api/todo/`;

const TaskStore = create(
    set({
        tasks : {},
        isLoading : false,
        error : null,

        fetchData : async() => set(
            (state) => {
                set({isLoading: true});
                try{
                    const token = localStorage.getItem('access_token');
                    const response = axios.get(`${API_URL}read_task/`, {
                        headers= {Authorization: `Bearer ${token}`}
                    });

                    set({tasks: response.data}, isLoading = false);
                    
                }catch(err){
                    set({error: err.message, isLoading: false});
                }
            }
        )


        addTask : async() => set(
            (state) => {
                
            }
        )

        

    })
)

export default TaskStore;