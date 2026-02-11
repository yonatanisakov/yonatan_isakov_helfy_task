const validateTask = (req, res, next) => {
    const { title, priority } = req.body;

    // Validation for Title
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required and must be a string' });
    }

    // Validation for Priority
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Priority must be low, medium, or high' });
    }

    next();
};

module.exports = { validateTask };