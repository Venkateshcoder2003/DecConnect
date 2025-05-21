import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProjectPage() {
    const [form, setForm] = useState({ title: '', description: '', requiredSkills: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/projects', {
            ...form,
            requiredSkills: form.requiredSkills.split(','),
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
            <input placeholder="Required Skills" onChange={e => setForm({ ...form, requiredSkills: e.target.value })} />
            <button type="submit">Create</button>
        </form>
    );
}
