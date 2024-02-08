import Comment from "../Model/comment";

class CommentController {
    async store(req, res) {
        const { Usuario, Comentario } = req.body;

        try {
            // Verifica se o comentário já existe pelo usuário
            let existingComment = await Comment.findOne({ Usuario });

            if (existingComment) {
                res.status(400).json({ error: 'Comentário já existe' });
            } else {
                // Cria um novo comentário
                const newComment = await Comment.create({
                    Usuario,
                    Comentario
                });

                res.json(newComment);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new CommentController();
