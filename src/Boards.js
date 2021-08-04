import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './Board.scss';

import TaskList from './TaskList';
import EditTaskBox from './EditTaskBox';

var activeTaskObj, activeListId = null;
const firedKeys = {};

const Boards = () => {
    const [mainObj, setMainObj] = useState({
        tasks: {
            'one': { id: 'one', title: 'task 1', desc: 'desc for task 1' },
            'two': { id: 'two', title: 'task 2', desc: 'desc for task 2' },
            'three': { id: 'three', title: 'task 3', desc: 'desc for task 3' },
            'four': { id: 'four', title: 'task 4', desc: 'desc for task 4' },
            'five': { id: 'five', title: 'task 5', desc: 'desc for task 5' },
            'six': { id: 'six', title: 'task 6', desc: 'desc for task 6' },
            'seven': { id: 'seven', title: 'task 7', desc: 'desc for task 7' },
            'eight': { id: 'eight', title: 'task 8', desc: 'desc for task 8' }
        },
        lists: {
            'one': { id: 'one', title: 'list 1', taskIds: ['one', 'two', 'three', 'four'] },
            'two': { id: 'two', title: 'list 2', taskIds: ['five', 'six'] },
            'three' : { id: 'three', title: 'list 3', taskIds: ['seven', 'eight'] },
            'four' : { id: 'four', title: 'list 4', taskIds: [] },
            'five' : { id: 'five', title: 'list 5', taskIds: [] },
            'six': { id: 'six', title: 'list 6', taskIds: [] }
        },
        listOrder: ['one', 'two', 'three', 'four', 'five', 'six']
    });
    const [ taskObjToEdit, setTaskObjToEdit ] = useState({});


    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if(!destination) return;
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newMainObj = { ...mainObj };
        mainObj.lists[source.droppableId].taskIds.splice(source.index, 1);
        mainObj.lists[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);

        setMainObj(newMainObj);
    }

    const editTask = taskObj => {
        if(!mainObj.tasks[taskObj.id]) return;

        const newMainObj = { ...mainObj };
        newMainObj.tasks[taskObj.id] = taskObj;
        setMainObj(newMainObj);
        setTaskObjToEdit({});
    }

    const deleteTask = returnObj => {
        const newMainObj = { ...mainObj };
        newMainObj.lists[returnObj.listId].taskIds.splice(returnObj.taskIndex, 1);
        delete newMainObj.tasks[returnObj.taskId];
        setMainObj(newMainObj);
    }

    const handleTaskHover = returnObj => activeTaskObj = returnObj;
    const handleListHover = returnId => activeListId = returnId;
    
    useEffect(() => {
        function onKeyDown(e){
            if(e.key in firedKeys) return;
            firedKeys[e.key] = 0;
            if('x' in firedKeys && 'Control' in firedKeys && activeTaskObj){
                deleteTask(activeTaskObj);
            }
            if('z' in firedKeys && 'Control' in firedKeys && activeListId){
                console.log('added to ' + activeListId);
            }
        }
    
        function onKeyUp(e){
            if(!(e.key in firedKeys)) return;
            delete firedKeys[e.key];
        }

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    requestEditTask={taskObj => setTaskObjToEdit(taskObj)}
                    handleTaskHover={handleTaskHover}
                    handleListHover={handleListHover}
                    />
                ))}
            </DragDropContext>
            {taskObjToEdit.id ? 
                <EditTaskBox taskObj={taskObjToEdit} editTask={editTask}/>
            : ''}
        </div>
    )
}

export default Boards;