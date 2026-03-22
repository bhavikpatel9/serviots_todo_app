import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { toast } from 'react-toastify';

import { getTasks, deleteTask, updateTask, type TaskType } from '@/api/task/task.api';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { dispatchClearUser } from '@/redux/dispatch/user.dispatch';
import TaskItem from '@/components/tasks/TaskItem';

const TaskList = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);
    const [deletingTask, setDeletingTask] = useState<TaskType | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks
    });

    const tasks = data?.data || [];

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteTask(id),
        onSuccess: () => {
            toast.success('Task deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setDeletingTask(null);
        },
    });

    const toggleStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) =>
            updateTask(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const handleToggleStatus = useCallback((task: TaskType) => {
        if (!task._id) return;
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        toggleStatusMutation.mutate({ id: task._id, status: newStatus });
    }, [toggleStatusMutation.mutate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatchClearUser();
        navigate(ROUTES.LOGIN.path);
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col items-center py-8">
            <div className="w-full max-w-4xl px-4 flex-none">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition"
                        >
                            + Create New Task
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl px-4 flex-1 overflow-hidden flex flex-col border rounded-lg bg-white shadow-sm">
                <div className="p-0 overflow-y-auto flex-1 h-full relative">
                    {isLoading ? (
                        <p className="p-6 text-center text-gray-500">Loading tasks...</p>
                    ) : error ? (
                        <p className="p-6 text-center text-red-500">Failed to load tasks</p>
                    ) : tasks.length === 0 ? (
                        <p className="p-6 text-center text-gray-500">No tasks found. Create one!</p>
                    ) : (
                        <ul className="divide-y divide-gray-300">
                            {tasks.map((task: TaskType) => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    onToggleStatus={handleToggleStatus}
                                    onEdit={setEditingTask}
                                    onDelete={setDeletingTask}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <CreateTaskModal
                isOpen={isCreateModalOpen || !!editingTask}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setEditingTask(null);
                }}
                initialData={editingTask}
            />

            <ConfirmModal
                isOpen={!!deletingTask}
                onClose={() => setDeletingTask(null)}
                onConfirm={() => deletingTask?._id && deleteMutation.mutate(deletingTask._id)}
                title="Delete Task"
                message={`Are you sure you want to delete "${deletingTask?.title}"?`}
                isPending={deleteMutation.isPending}
            />
        </div>
    );
}

export default TaskList;