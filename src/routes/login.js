const { User } = require('../db/Sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Identifiant ou mot de passe incorrect`;
          return res.status(401).json({ message })
        }

        // jwt
        const token = jwt.sign(
            {userId : user.id},
            privateKey,
            {expiresIn : '24h'}
        )
        // const message = `Connection avec succées !`;
        return res.json({ token })
      })
    }).catch(err => {
        const message = `L'utilisateur n'a pas pus etre connecter réesayer dans quelques instant .`
        return res.status(500).json({ message, data:err });
    })
  })
}