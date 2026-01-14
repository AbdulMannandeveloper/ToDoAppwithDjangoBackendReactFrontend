import useTaskStore from "./Stores/TaskStore";
import { useState } from  'react'

const TaskEntry = () => {
    const [input, setInput] = useState('');
    const setTask = useTaskStore((state)=> state.addTask);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!(input.trim())) return;
        addTask(input);

        setInput('');

    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter Your Task"
                    />
                    <button 
                        type="submit"
                    >Add Task</button>
                </form>
            </div>
        </>
    )

}

export default TaskEntry;