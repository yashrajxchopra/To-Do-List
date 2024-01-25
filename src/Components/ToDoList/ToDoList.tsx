import React, { useState } from 'react'

export default function ToDoList() {
    const [tasks, setTasks] = useState(['Make Dinner', 'Exercise']);
    const [newTask, setNewTask] = useState('');

    function handleNewTask(e){
        setNewTask(e.target.value)
    }
    function handleAddTask(){
        if(newTask.trim() !== ""){
             setTasks([...tasks, newTask])
             setNewTask('');
        }
    }
    function handleDeleteTask(index){
        const updatedTasks = tasks.filter((_, i)=>i !== index);
        setTasks(updatedTasks);

    }
    function handleUp(index){
        if(index > 0){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]]
            setTasks(updatedTask);
        }

    }
    function handleDown(index){
        if(index < tasks.length - 1){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]]
            setTasks(updatedTask);
        }

    }
  return (
    <div className='to-do-list'>
        <h1>To Do List</h1>
        <div>
            <input type="text" placeholder="Add new task..." value={newTask} onChange={handleNewTask} />
            <button className='add-btn' onClick={handleAddTask}>Add</button>
        </div>
        <ol>
            {tasks.map((task, index) => 
            <li key={index}>
                <span>{task}</span>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
                <button onClick={() => handleUp(index)}>Up</button>
                <button onClick={() => handleDown(index)}>Down</button>
            </li>
            
)}
            
        </ol>
    </div>
  )
}
