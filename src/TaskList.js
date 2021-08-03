import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = ({ tasks, id, title, taskIds }) => {
    return (
        <div className="task-list-container">
            <div className="title">{title}</div>
            <Droppable droppableId={id}>
                {provided => (
                    <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="task-list"
                    >
                        {taskIds.map((taskId, index) => (
                            <Task 
                            key={taskId}
                            id={taskId}
                            index={index}
                            title={tasks[taskId].title}
                            desc={tasks[taskId].desc}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TaskList
