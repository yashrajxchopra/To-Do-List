import React, { useEffect, useState } from 'react'
import "./ToDoList.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
export default function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEmpty, setEmpty] = useState(true);

    //get tasks from in local storage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('taskArray'));
    
        if (storedTasks!==null && storedTasks.length!==0) {
          setTasks(storedTasks);
          setEmpty(false);
        } else {
          setTasks([]);
          setEmpty(true);
        }
      }, []); 
    

    function handleNewTask(e){
        setNewTask(e.target.value)
    }
    function handleAddTask(){
        if(newTask.trim() !== ""){
             setTasks([...tasks, newTask])
             setNewTask('');
             setEmpty(false);
        }
        
    }
    function handleDeleteTask(index){
        const updatedTasks = tasks.filter((_, i)=>i !== index);
        if(updatedTasks.length===0){
            localStorage.removeItem('taskArray');
            setEmpty(true);
        }
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
    useEffect(() => {
        if(!isEmpty){
            localStorage.setItem('taskArray', JSON.stringify(tasks));
        }
       
      }, [tasks]);
      
  return (
    <div className='to-do-list'>
        <h1>To Do List</h1>
        <div>
            <input type="text" placeholder="Add new task..." value={newTask} onChange={handleNewTask} maxLength={24}/>
            <button className='add-btn' onClick={handleAddTask}>Add</button>
        </div>
        <div className='task-div'>
        {isEmpty?(<p>No Tasks</p>):(<ol>
            {tasks.map((task, index) => 
            <li key={index}>
                <span>{task}</span>
                <div className='btn-div'>
                <button onClick={() => handleDeleteTask(index)}><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={() => handleUp(index)}><FontAwesomeIcon icon={faArrowUp}/></button>
                <button onClick={() => handleDown(index)}><FontAwesomeIcon icon={faArrowDown}/></button>
                </div>
            </li>)}
        </ol>)}
        </div>
        
    </div>
  )
}
