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
        } = req.body;

        const Image =  req.file ? req.file.filename : null;

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
                    DataPublicacao: Date.now(),
                    Image,
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








// import Receita from "../Model/Receita"
// import User from "../Model/User"
// class cadastroReceita{
//    async store(req,res){
//         const {filename} = req.file
//         const {Titulo, nomeDoChef, ingredientes, modoDePreparo, tempo} = req.body
//         const {user_id} = req.headers

//         let receitaCadastra = await Receita.create({
//             Titulo, 
//             nomeDoChef, 
//             ingredientes, 
//             modoDePreparo, 
//             tempo,
//             user: user_id,
//             foto: filename
//         })
        
//         return res.json(receitaCadastra)
//     }
//     async show(req, res){
//         try {
//             const {user_id} = req.headers
//             console.log("headers", user_id)
//             if(!user_id){
//                 return res.status(404).json({Message: "Usuário Não identificado!"})
//             }
            
//             const userRecieved = await User.exists({_id: user_id})
        
//             if(userRecieved){
//                 console.log("if com user", userRecieved)
//                 let receitaUsuario = await Receita.findOne({user: user_id})
//                 return res.status(200).json(receitaUsuario)
//             }
//             console.log("else do false", userRecieved)
//             return res.status(404).json({Message: "Não existe usuário com este ID"})

//         } catch (error) {
//             return res.status(500).json({Message: error.message})
//         }
//     }
//     async index(req,res){
//         const {id} = req.query
//         if(!id){
//             return res.status(404).json({Message: "Insira um ID Válido"})
//         }
//         const receitaSolicitada = await Receita.findById(id)

//         return res.status(200).json(receitaSolicitada)
//     }
    
// }

// export default new cadastroReceita()
