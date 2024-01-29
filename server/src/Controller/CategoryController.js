import Category from "../Model/category";

class CategoryController {
    async store(req, res) {
        const { categoryID, nameCategory, description, image, recipes } = req.body;

        try {
            // Verifica se a categoria já existe pelo ID
            let existingCategory = await Category.findOne({ categoryID });

            if (existingCategory) {
                res.status(400).json({ error: 'Categoria já existe' });
            } else {
                // Cria uma nova categoria
                const newCategory = await Category.create({
                    categoryID,
                    nameCategory,
                    description,
                    image,
                    recipes
                });

                res.json(newCategory);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new CategoryController();
