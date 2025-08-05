import { useState, type FormEvent, type ChangeEvent } from 'react'
import '../register/register.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { registerApi } from '../../../shared/config/api';

export default function Register() {
    const [formData , setFormData] = useState({email: '', username:'', password:''})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleChange = (e: ChangeEvent <HTMLInputElement>) => {
        const {name,value} = e.target;

        //... means spread bhitrako matra lincha
        setFormData({...formData,[name]: value})

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (loading) {
            return;
        }
        setLoading(true);
        
        registerApi(formData).then(() => {
            toast.success("Registered successfully!");
            navigate('/login', {replace: true })
        }
        ).catch((err: AxiosError) => {
                   const message = err.response?.data as String ?? 'Server Error';
                   toast.error(message);
        }).finally(() => {
                    setLoading(false);
        }
        );  
    
    }
        
    return(
        <div className="register-wrapper">
            <form onSubmit={handleSubmit} className="register-form">
                <h3>Register</h3>
                <input onChange={handleChange} name='email' value={formData.email} placeholder='Email' type='text' />
                <input onChange={handleChange} name='username' value={formData.username} placeholder="Username" type="text" />
                <input onChange={handleChange} name='password' value={formData.password} placeholder="Password" type="text" />
                <p className="login-prompt">Already have an account? <a href="/login">Login</a></p>
                <button>Submit</button>
            </form>
        </div>
    )
}