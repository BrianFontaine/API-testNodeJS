const { Pokemon } = require('../db/Sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', auth ,(req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
       return Pokemon.findByPk(id).then(pokemon => {
        if (pokemon === null) {
            const messages = 'Le pokémon demandée n\'existe pas '
            res.status(404).json({messages})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.status(201).json({message, data: pokemon })
      })
    })
    .catch(error => {
        if(error instanceof UniqueConstraintError) {
            return res.status(400).json({message: "Le nom du pokémon est déja utilisé !"})
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});    
        }
        const message = 'le pokémon n\'a pas pus etre modifié. Réessayer plus tard !'
        res.status(500).json({ message , data: error });
    })
  })
}