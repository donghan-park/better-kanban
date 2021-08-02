import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Task from './Task';

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

        const newTaskOrder = mainObj.taskOrder;
        newTaskOrder.splice(source.index, 1);
        newTaskOrder.splice(destination.index, 0, draggableId);

        setMainObj({ ...mainObj, taskOrder: newTaskOrder });
    }

    return (
        <div className='boards'>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="column-container">
                    <div className="title">
                        EX TASK LIST 1
                    </div>
                    <Droppable droppableId='yolo'>
                        {provided => (
                            <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="list"
                            >
                                {mainObj.taskOrder.map((taskId, index) => (
                                    <Task 
                                    key={taskId}
                                    id={taskId}
                                    index={index}
                                    title={mainObj.tasks[taskId].title}
                                    desc={mainObj.tasks[taskId].desc}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default Boards
