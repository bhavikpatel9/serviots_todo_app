import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { toast } from 'react-toastify';

import { loginSchema, type LoginFormData } from '@/validationSchemas/login.schema';
import { loginUser, type LoginType } from '@/api/auth/auth.api';
import Input from '@/components/common/Input';
import { dispatchSetUser } from '@/redux/dispatch/user.dispatch';

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const mutation = useMutation({
        mutationFn: (data: LoginType) => loginUser(data),
        onSuccess: (response) => {
            toast.success('Login successful!');
            console.log("login response:", response)
            console.log("login response token:", response.data.token)
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                dispatchSetUser({
                    token: response.data.token,
                    email: response.data.email,
                    name: response.data.name
                });
                navigate(ROUTES.TASKS.path);
            }
        },
    });

    const onSubmit = (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        className={`w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {mutation.isPending ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to={ROUTES.REGISTER.path} className="text-blue-600 hover:text-blue-800 font-medium">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
