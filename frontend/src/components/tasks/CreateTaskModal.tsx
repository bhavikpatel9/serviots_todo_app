import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { taskSchema, type TaskFormData } from '@/validationSchemas/task.schema';
import { createTask, updateTask, type TaskType } from '@/api/task/task.api';
import { Modal } from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialData?: TaskType | null;
}

export const CreateTaskModal = ({ isOpen, onClose, initialData }: Props) => {
    const queryClient = useQueryClient();
    const isEdit = !!initialData;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TaskFormData>({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            title: '',
            description: ''
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    title: initialData.title,
                    description: initialData.description || ''
                });
            } else {
                reset({ title: '', description: '' });
            }
        }
    }, [isOpen, initialData, reset]);

    const mutation = useMutation({
        mutationFn: (data: TaskFormData) => {
            if (isEdit && initialData?._id) {
                return updateTask(initialData._id, data);
            }
            return createTask(data as TaskType);
        },
        onSuccess: () => {
            toast.success(isEdit ? 'Task updated successfully!' : 'Task created successfully!');
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            onClose();
        },
    });

    const onSubmit = (data: TaskFormData) => {
        mutation.mutate(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Task" : "Create New Task"}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Title"
                    placeholder="Enter task title"
                    register={register}
                    name="title"
                    error={errors.title?.message}
                />

                <Textarea
                    label="Description"
                    placeholder="Enter task description (optional)"
                    rows={4}
                    register={register}
                    name="description"
                    error={errors.description?.message}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {mutation.isPending
                            ? (isEdit ? 'Updating...' : 'Creating...')
                            : (isEdit ? 'Update Task' : 'Create Task')}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
