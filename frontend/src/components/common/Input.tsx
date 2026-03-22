import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface InputProps<TFormValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode | string;
  register?: UseFormRegister<TFormValues>;
  error?: string;
  name?: Path<TFormValues>;
  icon?: string;
  onIconClick?: () => void;
  iconClassName?: string;
  containerClassName?: string;
}

const Input = <TFormValues extends FieldValues>({
  label,
  name,
  className,
  error,
  onChange,
  register,
  icon,
  iconClassName,
  onIconClick,
  type,
  containerClassName,
  ...props
}: InputProps<TFormValues>) => {
  if (type === 'checkbox') {
    return (
      <div className={clsx('flex items-start', containerClassName)}>
        <input
          id={name}
          type="checkbox"
          className={clsx('cursor-pointer flex-shrink-0', className)}
          {...props}
          onChange={onChange}
          {...(register && name && register(name, { onChange }))}
        />
        {label && (
          <label htmlFor={name} className="ml-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {error && <p className="ml-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className={clsx('gap-3 mb-4', containerClassName)}>
      {label && <label htmlFor={name} className='font-bold text-[#5a5a5a] block mb-1'>{label}</label>}
      <div className={clsx('relative')}>
        <input
          id={name}
          type={type}
          className={clsx(
            'bg-[#f5f8fc] border border-gray-300 text-gray-900 text-sm block w-full p-2.5 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
          onChange={onChange}
          {...(register && name && register(name, { onChange }))}
        />
        {icon && (
          <img
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer',
              iconClassName
            )}
            onClick={onIconClick}
            src={icon}
          />
        )}
      </div>
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
