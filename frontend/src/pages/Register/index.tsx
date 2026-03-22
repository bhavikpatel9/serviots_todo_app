import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { toast } from 'react-toastify';

import { registrationSchema, type RegistrationFormType } from '@/validationSchemas/registration.schema';
import { registerUser } from '@/api/auth/auth.api';
import Input from '@/components/common/Input';

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegistrationFormType>({
        resolver: yupResolver(registrationSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const mutation = useMutation({
        mutationFn: (data: RegistrationFormType) => registerUser(data),
        onSuccess: () => {
            toast.success('Registration successful!');
            navigate(ROUTES.LOGIN.path);
        },
    });

    const onSubmit = (data: RegistrationFormType) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="enter full name"
                        register={register}
                        name="name"
                        error={errors.name?.message}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="enter email address"
                        register={register}
                        name="email"
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="enter password"
                        register={register}
                        name="password"
                        error={errors.password?.message}
                    />

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className={`w-full pt-1 pb-1 mt-2 py-2.5 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {mutation.isPending ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN.path} className="text-blue-600 hover:text-blue-800 font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

