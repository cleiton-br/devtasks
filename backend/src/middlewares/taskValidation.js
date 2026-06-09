const validateTask = (req, res, next) => {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "O título da tarefa é obrigatório" });
    }

    next();
};

module.exports = {
    validateTask
};