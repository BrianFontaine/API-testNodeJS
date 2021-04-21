const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      const name  = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      // const offset = parseInt(req.query.offset);
      if (name.length < 2) {
        const message = "Le terme de recheche doit comporter au minimun 2 caaractéres."
        res.status(400).json({message});
      }
      return Pokemon.findAndCountAll({ 
        where: {
          name: { // name est la propriete du modéle pkemon
            [Op.like] : `%${name}%`, // 'name' est le critere de recheeche
          }
      },
      order : ['name'],
      limit: limit,
      // offset : offset ? offset : 1
    })
      .then(({ count,rows }) => {
        const message = `Il y a s ${count} pokémons qui correspondent  au terme de recherche ${name}`;
        res.status(200).json({message, data : rows});      
      })
    }else{
      Pokemon.findAll({order: ['name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.status(200).json({ message, data: pokemons })
      }).catch(error => {
          const message = `La liste des pokémons n'a pas pus etre recuperée . Réessayer dans quelques instants.`
          res.status(500).json({ message , data: error });
      })
    }
  })
}