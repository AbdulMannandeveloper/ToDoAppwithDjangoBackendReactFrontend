import { create } from 'zustand';



const FilterStore = create(
    (set) => ({
        filter: 'all',

        setFilter : (newFilter)=>{
            set({
                filter: newFilter
            })
        }
    })
)

export default FilterStore;