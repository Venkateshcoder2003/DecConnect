import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setUser(res.data));

        axios.get('http://localhost:5000/api/projects', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            const mine = res.data.filter(p => p.postedBy?._id === JSON.parse(atob(token.split('.')[1])).id);
            setMyProjects(mine);
        });
    }, []);

    const handleAccept = async (projectId, userId) => {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/api/projects/${projectId}/accept`, {
            userId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Request accepted!");

        // Re-fetch to update UI
        const res = await axios.get('http://localhost:5000/api/projects', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const mine = res.data.filter(p => p.postedBy?._id === JSON.parse(atob(token.split('.')[1])).id);
        setMyProjects(mine);
    };

    return user ? (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Skills: {user.skills.join(', ')}</p>

            <h3>My Projects</h3>
            {myProjects.map(project => (
                <div key={project._id} style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <p>Skills: {project.requiredSkills.join(', ')}</p>

                    <h5>Pending Requests</h5>
                    {project.pendingRequests?.length > 0 ? project.pendingRequests.map(userId => (
                        <div key={userId}>
                            <p>User ID: {userId}</p>
                            <button onClick={() => handleAccept(project._id, userId)}>Accept</button>
                        </div>
                    )) : <p>No pending requests.</p>}
                </div>
            ))}
        </div>
    ) : <p>Loading...</p>;
}
