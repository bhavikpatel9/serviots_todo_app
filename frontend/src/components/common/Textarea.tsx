import clsx from 'clsx';
import type { TextareaHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface TextareaProps<TFormValues extends FieldValues>
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: React.ReactNode | string;
    register?: UseFormRegister<TFormValues>;
    error?: string;
    name?: Path<TFormValues>;
    containerClassName?: string;
}

const Textarea = <TFormValues extends FieldValues>({
    label,
    name,
    className,
    error,
    onChange,
    register,
    containerClassName,
    ...props
}: TextareaProps<TFormValues>) => {
    return (
        <div className={clsx('gap-3 mb-4', containerClassName)}>
            {label && <label htmlFor={name} className="font-bold text-[#5a5a5a] block mb-1">{label}</label>}
            <div className="relative">
                <textarea
                    id={name}
                    className={clsx(
                        'bg-[#f5f8fc] border border-gray-300 text-gray-900 text-sm block w-full p-2.5 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y',
                        error ? 'border-red-500' : 'border-gray-300',
                        className
                    )}
                    {...props}
                    onChange={onChange}
                    {...(register && name && register(name, { onChange }))}
                />
            </div>
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default Textarea;
