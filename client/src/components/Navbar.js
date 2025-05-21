import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Projects</Link> |
            <Link to="/create">Create Project</Link> |
            <Link to="/profile">Profile</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/signup">Signup</Link>
        </nav>
    );
}
