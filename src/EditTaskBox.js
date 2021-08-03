import { useState } from 'react';

const EditTaskBox = ({ taskObj, editTask }) => {
    const [ newTaskObj, setNewTaskObj ] = useState(taskObj);

    return (
        <div className='edit-task-box'>
            <div className="background" onClick={() => editTask(newTaskObj)}/>
            <div className="container" onKeyDown={e => { if(e.key === 'Enter') editTask(newTaskObj) }}>
                Edit Task:
                <input type="text" className="title" defaultValue={taskObj.title} onChange={e => setNewTaskObj({ ...newTaskObj, title: e.target.value })}/>
                <input type="text" className="desc" defaultValue={taskObj.desc} onChange={e => setNewTaskObj({ ...newTaskObj, desc: e.target.value })}/>
            </div>
        </div>
    )
}

export default EditTaskBox
