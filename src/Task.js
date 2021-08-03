import { Draggable } from 'react-beautiful-dnd';
import { useEffect } from 'react';

var activeTaskId = null;

const Task = ({ index, taskObj, requestEditTask, requestDeleteTask }) => {
    useEffect(() => {
        console.log(taskObj.id + ' made')
        document.addEventListener('keydown', function(e){
            if(e.key === 'Backspace' && taskObj.id === activeTaskId){
                requestDeleteTask({ taskId: taskObj.id, taskIndex: index });
            }
        });
    }, []);

    return (
        <Draggable draggableId={taskObj.id} index={index}>
            {provided => (
                <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="task"
                >
                    <div className="shadow" 
                    onClick={() => requestEditTask(taskObj)}
                    onMouseEnter={() => activeTaskId = taskObj.id}
                    onMouseLeave={() => activeTaskId = null}
                    >
                        <p className="title">{taskObj.title}</p>
                        <p className="desc">{taskObj.desc}</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task;