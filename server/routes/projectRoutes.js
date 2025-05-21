const router = require('express').Router();
const { createProject, getProjects, collaborate, acceptCollaborator } = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createProject);
router.get('/', getProjects);
router.post('/:id/collaborate', auth, collaborate);
router.post('/:id/accept', auth, acceptCollaborator);

module.exports = router;