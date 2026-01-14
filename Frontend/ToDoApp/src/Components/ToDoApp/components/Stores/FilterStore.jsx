import { create } from 'zustand';



const useFilterStore = create(
    (set) => ({
        filter: 'all',

        setFilter : (newFilter)=>{
            set({
                filter: newFilter
            })
        }
    })
)

export default useFilterStore;