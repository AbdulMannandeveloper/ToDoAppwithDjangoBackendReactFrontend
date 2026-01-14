import useTaskStore from "./Stores/TaskStore";
import useFilterStore from "./Stores/FilterStore";
import { useState , useEffect } from 'react';

const Lists = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const editTask = useTaskStore((state) => state.editTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);

    const filter = useTaskStore((state) => state.filter);

    useEffect(() => {
        fetchTasks();
    }, []);
    
    const [editingId, setEditingId] = useState(); 
    const [editText, setEditText] = useState('');

    const startEdit = (task) => {
        setEditingId(task.id);   
        setEditText(task.task); 
    };

    const handleEditSave = async (id, currentIsDone) => {
        if (!editText.trim()) return;

        await editTask(id, editText, currentIsDone);
        
        setEditingId(null);
        setEditText('');
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")) {
            deleteTask(id);
        }
    };

    const handleToggle = (task) => {
        editTask(task.id, task.task, !task.is_done);
    };


    return (
        <>
            <div>
                {tasks.length === 0?(
                    <li>No Task Found</li>
                ):(
                    tasks.map((task) => {
                        <li key={task.id}>
                            {editingId == task.id?(
                                <input 
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                >
                                    <div>
                                        <button
                                            onClick={() => handleEditSave(task.id, task.is_done)}
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </input>
                            ):(
                                <>
                                    <div onClick={() => handleToggle(task)}>
                                        <span>
                                            {task.is_done?(
                                                'Completed'
                                            ):(
                                                'Active'
                                            )}
                                            {task.task}
                                        </span>
                                    </div>

                                    <div>
                                            <button
                                                onClick={() => startEdit(task)}
                                                title="Edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                title="Delete"
                                            >
                                                Delete
                                            </button>
                                    </div>
                                </>

                            )}
                        </li>
                    })
                )}
            </div>
        </>
    )
}

export default Lists;



