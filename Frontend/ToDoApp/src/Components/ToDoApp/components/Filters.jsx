import useFilterStore from "./Stores/FilterStore";

const Filters = () => {
    const Filter = useFilterStore((state) => state.filter)
    const setFilter = useFilterStore((state) => state.setFilter)

    return (
        <>
            <div>
                {['all', 'completed','active'].map((f) => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {
                            f.chartat(0).toLowerCase() + f.slice(1)
                        }
                    

                    </button>
                ))}
            </div>
        </>
    )
    
}

export default Filters;
