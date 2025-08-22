import { useState, type FormEvent, type ChangeEvent } from 'react'
import '../login/login.css'
import { useNavigate } from 'react-router-dom';
import type { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { loginApi } from '../../../shared/config/api.tsx';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        //... means spread bhitrako matra lincha
        setFormData({ ...formData, [name]: value })

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);
        loginApi(formData).then((res: AxiosResponse) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
            navigate('/home')

        }
        ).catch((err: AxiosError) => {
            const message = err.response?.data as String ?? 'Server Error';
            alert(message)
            toast.error(message);
        }).finally(() => {
            setLoading(false);
        }
        );
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h3>Login</h3>
                <input onChange={handleChange} name='username' value={formData.username} placeholder="Username" type="text" />
                <input onChange={handleChange} name='password' value={formData.password} placeholder="Password" type="text" />
                <p className="register-prompt">Don't have an account? <a href="/register">Register</a></p>
                <button>Submit</button>
            </form>
        </div>
    )
}