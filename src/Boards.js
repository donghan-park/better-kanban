import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './Board.scss';

import TaskList from './TaskList';
import EditTaskBox from './EditTaskBox';

const Boards = () => {
    const [mainObj, setMainObj] = useState({
        tasks: {
            'one': { id: 'one', title: 'task 1', desc: 'desc for task 1' },
            'two': { id: 'two', title: 'task 2', desc: 'desc for task 2' },
            'three': { id: 'three', title: 'task 3', desc: 'desc for task 3' },
            'four': { id: 'four', title: 'task 4', desc: 'desc for task 4' },
            'five': { id: 'five', title: 'task 5', desc: 'desc for task 5' },
            'six': { id: 'six', title: 'task 6', desc: 'desc for task 6' }
        },
        taskOrder: ['one', 'two', 'three', 'four', 'five', 'six'],
        lists: {
            'one': { id: 'one', title: 'list 1', taskIds: ['one', 'two', 'three', 'four'] },
            'two': { id: 'two', title: 'list 2', taskIds: ['five', 'six'] }
        },
        listOrder: ['one', 'two']
    });

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if(!destination) return;
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newMainObj = { ...mainObj };
        mainObj.lists[source.droppableId].taskIds.splice(source.index, 1);
        mainObj.lists[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);

        setMainObj(newMainObj);
    }

    const [ taskObjToEdit, setTaskObjToEdit ] = useState({});

    // function sendMessage(message){
    //     console.log(message);
    //     if(message === 'background') setEditingTaskInfo({ ...editingTaskInfo, id: '' });
    // }

    function requestEditTask(taskId){
        setTaskObjToEdit(mainObj.tasks[taskId]);
    }

    function editTask(taskObj){
        if(mainObj.tasks[taskObj.id]) {
            const newMainObj = { ...mainObj };
            newMainObj.tasks[taskObj.id] = taskObj;
            setMainObj(newMainObj);
            setTaskObjToEdit({});
        }
    }

    return (
        <div className='boards'>
            <DragDropContext onDragEnd={onDragEnd}>
                {mainObj.listOrder.map(listId => (
                    <TaskList 
                    key={listId} 
                    id={listId} 
                    tasks={mainObj.tasks} 
                    title={mainObj.lists[listId].title} 
                    taskIds={mainObj.lists[listId].taskIds}
                    requestEditTask={requestEditTask}
                    />
                ))}
            </DragDropContext>
            {taskObjToEdit.id ? 
                <EditTaskBox taskObj={taskObjToEdit} editTask={editTask}/>
            : ''}
        </div>
    )
}

export default Boards
