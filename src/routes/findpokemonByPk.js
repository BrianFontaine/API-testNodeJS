const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon === null) {
          const messages = 'Le pokémon demandée n\'existe pas '
          res.status(404).json({messages})
      }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = 'le pokémon n\'a pas pus etre recuperé. Réessayer plus tard !'
        res.status(500).json({ message , data: error });
    })
  })
}