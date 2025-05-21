import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', form);
        localStorage.setItem('token', res.data.token);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}
