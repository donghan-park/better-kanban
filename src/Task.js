import { Draggable } from 'react-beautiful-dnd';

const Task = ({ index, taskObj, requestEditTask, handleTaskHover }) => {

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
                    onMouseEnter={() => handleTaskHover({ taskId: taskObj.id, taskIndex: index })}
                    onMouseLeave={() => handleTaskHover(null)}
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