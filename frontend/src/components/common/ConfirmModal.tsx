import { Modal } from '@/components/common/Modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    isPending?: boolean;
}

export const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Confirm Action', 
    message = 'Are you sure you want to proceed?',
    isPending = false
}: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="py-2">
                <p className="text-gray-600">{message}</p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isPending}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isPending}
                    className={`px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors ${
                        isPending ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isPending ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </Modal>
    );
};
