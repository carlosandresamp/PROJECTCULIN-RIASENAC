import Avaliation from "../Model/avaliation";

class AvaliationController {
    async store(req, res) {
        const { Usuario, Avaliacao } = req.body;

        try {
            // Verifica se já existe uma avaliação do usuário
            const existingAvaliation = await Avaliation.findOne({ Usuario });

            if (existingAvaliation) {
                // Se já existir, atualiza a avaliação existente
                existingAvaliation.Avaliacao = Avaliacao;
                existingAvaliation.Data = Date.now();
                await existingAvaliation.save();
                res.json(existingAvaliation);
            } else {
                // Se não existir, cria uma nova avaliação
                const novaAvaliacao = await Avaliation.create({
                    Usuario,
                    Avaliacao
                });
                res.json(novaAvaliacao);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new AvaliationController();