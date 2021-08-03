import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './Board.scss';

import TaskList from './TaskList';

const Boards = () => {
    const [mainObj, setMainObj] = useState({
        tasks: {
            'one': { title: 'task 1', desc: 'desc for task 1' },
            'two': { title: 'task 2', desc: 'desc for task 2' },
            'three': { title: 'task 3', desc: 'desc for task 3' },
            'four': { title: 'task 4', desc: 'desc for task 4' },
            'five': { title: 'task 5', desc: 'desc for task 5' },
            'six': { title: 'task 6', desc: 'desc for task 6' }
        },
        taskOrder: ['one', 'two', 'three', 'four', 'five', 'six'],
        lists: {
            'one': { title: 'list 1', taskIds: ['one', 'two', 'three', 'four'] },
            'two': { title: 'list 2', taskIds: ['five', 'six'] }
        },
        listOrder: ['one', 'two']
    });

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if(!destination) return;
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newMainObj = {...mainObj};
        mainObj.lists[source.droppableId].taskIds.splice(source.index, 1);
        mainObj.lists[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);

        setMainObj(newMainObj);
    }

    return (
        <div className='boards'>
            <DragDropContext onDragEnd={onDragEnd}>
                {mainObj.listOrder.map(listId => (
                    <TaskList key={listId} tasks={mainObj.tasks} id={listId} title={mainObj.lists[listId].title} taskIds={mainObj.lists[listId].taskIds}/>
                ))}
            </DragDropContext>
        </div>
    )
}

export default Boards
