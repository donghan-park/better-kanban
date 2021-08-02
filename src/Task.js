import { Draggable } from 'react-beautiful-dnd';

const Task = ({ id, index, title, desc }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="task"
                >
                    <div className="shadow">
                        <p className="title">{title}</p>
                        <p className="desc">{desc}</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task
