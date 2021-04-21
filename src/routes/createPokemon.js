const { Pokemon } = require('../db/sequelize');
const { ValidationError , UniqueConstraintError} = require('sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.status(201).json({ message, data: pokemon })
      }).catch(error => {
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({message: "Le nom du pokémon est déja utilisé !"})
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});    
        }
        const message = 'Le pokémon n\'a pas pus etre ajoutée au pokedex, veuillez reesayer plus tard.'
        res.status(500).json({ message , data: error });
    })
  })
}