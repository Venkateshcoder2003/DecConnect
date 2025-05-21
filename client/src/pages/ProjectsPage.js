import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/projects')
            .then(res => setProjects(res.data));
    }, []);

    const handleCollaborate = async (id) => {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/api/projects/${id}/collaborate`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Collaboration request sent!");
    };

    return (
        <div>
            <h2>All Projects</h2>
            {projects.map(p => (
                <div key={p._id}>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <p>Skills: {p.requiredSkills.join(', ')}</p>
                    <p>Posted By: {p.postedBy?.name}</p>
                    <button onClick={() => handleCollaborate(p._id)}>Collaborate</button>
                </div>
            ))}
        </div>
    );
}
