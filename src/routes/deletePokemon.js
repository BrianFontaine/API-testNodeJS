const { Pokemon } = require('../db/Sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
        if (pokemon === null) {
            const messages = 'Le pokémon demandée n\'existe pas '
            res.status(404).json({messages})
        }

      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.status(200).json({message, data: pokemonDeleted })
      })
    })
    .catch(error => {
        const message = 'le pokémon n\'a pas pus etre supprimé. Réessayer plus tard !'
        res.status(500).json({ message , data: error });
    })
  })
}