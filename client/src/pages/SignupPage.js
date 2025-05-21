import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', skills: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/signup', {
            ...form,
            skills: form.skills.split(','),
        });
        localStorage.setItem('token', res.data.token);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <input placeholder="Skills (comma-separated)" onChange={e => setForm({ ...form, skills: e.target.value })} />
            <button type="submit">Sign Up</button>
        </form>
    );
}
