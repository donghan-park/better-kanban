import { Draggable } from 'react-beautiful-dnd';

const Task = ({ index, taskObj, requestEditTask }) => {
    return (
        <Draggable draggableId={taskObj.id} index={index}>
            {provided => (
                <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="task"
                >
                    <div className="shadow" onClick={() => requestEditTask(taskObj.id)}>
                        <p className="title">{taskObj.title}</p>
                        <p className="desc">{taskObj.desc}</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task
