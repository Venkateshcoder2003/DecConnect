import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage.js';
import LoginPage from './pages/LoginPage.js';
import ProfilePage from './pages/ProfilePage.js';
import ProjectsPage from './pages/ProjectsPage.js';
import CreateProjectPage from './pages/CreateProjectPage.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreateProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
