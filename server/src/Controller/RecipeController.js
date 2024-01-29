import Recipe from "../Model/recipe";

class RecipeController {
    async store(req, res) {
        const {
            Name,
            Description,
            NomeDoChef,
            Ingredientes,
            ModoDePreparo,
            TempoDePreparo,
            Rendimento,
            DataPublicacao,
            Image
        } = req.body;

        try {
            // Verifica se a receita já existe pelo nome
            let existingRecipe = await Recipe.findOne({ Name });

            if (existingRecipe) {
                res.status(400).json({ error: 'Receita já existe' });
            } else {
                // Cria uma nova receita
                const newRecipe = await Recipe.create({
                    Name,
                    Description,
                    NomeDoChef,
                    Ingredientes,
                    ModoDePreparo,
                    TempoDePreparo,
                    Rendimento,
                    DataPublicacao,
                    Image
                });

                res.json(newRecipe);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new RecipeController();
