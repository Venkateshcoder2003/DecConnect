const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const project = await Project.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find().populate('postedBy', 'name');
    res.json(projects);
};

exports.collaborate = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!project.pendingRequests.includes(req.user.id) && !project.collaborators.includes(req.user.id)) {
        project.pendingRequests.push(req.user.id);
        await project.save();
    }

    res.json({ message: 'Collaboration request sent and pending approval' });
};

exports.acceptCollaborator = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ error: "Project not found" });
    if (String(project.postedBy) !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    const { userId } = req.body;

    if (project.pendingRequests.includes(userId)) {
        project.collaborators.push(userId);
        project.pendingRequests = project.pendingRequests.filter(id => String(id) !== userId);
        await project.save();
        return res.json({ message: 'Collaboration request accepted' });
    }

    res.status(400).json({ error: 'User not found in pending requests' });
};

