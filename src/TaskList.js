import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = ({ tasks, id, title, taskIds, requestEditTask, handleTaskHover, handleListHover }) => {
    return (
        <div className="task-list" onMouseEnter={() => handleListHover(id)} onMouseLeave={() => handleListHover(null)}>
            <div className="title">{title}</div>
            <div className="list-background"/>
            <Droppable droppableId={id}>
                    {provided => (
                        <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="list"
                        >
                            {taskIds.map((taskId, index) => (
                                <Task 
                                key={taskId}
                                index={index}
                                taskObj={tasks[taskId]}
                                requestEditTask={requestEditTask}
                                handleTaskHover={returnObj => handleTaskHover(returnObj ? { ...returnObj, listId: id } : null)}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
        </div>
    )
}

export default TaskList;