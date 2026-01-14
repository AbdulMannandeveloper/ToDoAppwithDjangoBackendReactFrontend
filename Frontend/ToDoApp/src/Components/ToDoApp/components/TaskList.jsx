import useTaskStore from "./Stores/TaskStore";
import useFilterStore from "./Stores/FilterStore";
import { useState, useEffect } from 'react';

const Lists = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const editTask = useTaskStore((state) => state.editTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    
    const filter = useFilterStore((state) => state.filter);

    const [editingId, setEditingId] = useState(null); 
    const [editText, setEditText] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.is_done;
        if (filter === 'active') return !task.is_done;
        return true;
    });

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
        <div>
            {filteredTasks.length === 0 ? (
                <p>No {filter} Tasks Found</p>
            ) : (
                <ul>
                    {filteredTasks.map((task) => (
                        <li key={task.id}>
                            
                            {editingId === task.id ? (
                                // --- EDIT MODE ---
                                <div>
                                    <input 
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        autoFocus
                                    />
                                    <button onClick={() => handleEditSave(task.id, task.is_done)}>
                                        Save
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                // --- VIEW MODE ---
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span onClick={() => handleToggle(task)}>
                                        [{task.is_done ? 'Completed' : 'Active'}] {task.task}
                                    </span>

                                    <button onClick={() => startEdit(task)}>
                                        Edit
                                    </button>
                                    
                                    <button onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Lists;