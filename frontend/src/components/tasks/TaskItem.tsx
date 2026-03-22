import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { TaskType } from '@/api/task/task.api';
import Input from '@/components/common/Input';

interface TaskItemProps {
    task: TaskType;
    onToggleStatus: (task: TaskType) => void;
    onEdit: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
}

const TaskItem = memo(({ task, onToggleStatus, onEdit, onDelete }: TaskItemProps) => {
    return (
        <li className="flex items-start justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-start gap-4 flex-1 min-w-0">
                <Input
                    type="checkbox"
                    className="mt-1.5 w-5 h-5 shrink-0 text-blue-600 rounded"
                    containerClassName=""
                    checked={task.status === 'completed'}
                    onChange={() => onToggleStatus(task)}
                />
                <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-medium break-words ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className={`text-sm mt-1 whitespace-pre-wrap break-words ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3 mt-1 ml-4 shrink-0 text-gray-400">
                <button
                    onClick={() => onEdit(task)}
                    className="hover:text-blue-500 transition p-1"
                    aria-label="Edit Task"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => onDelete(task)}
                    className="hover:text-red-500 transition p-1"
                    aria-label="Delete Task"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        </li>
    );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
