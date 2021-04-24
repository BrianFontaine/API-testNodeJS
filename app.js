// Imports
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/Sequelize');
const pokemonModel = require('./src/models/pokemon');

const app = express();
const port = 8000;


//middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(morgan('dev'));

// connection plus peupler la base de donnée
sequelize.initDb();

// configuration Routes
// on ajouter la resource et on lance la route (app avec express);
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findpokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

// erreur 404 page not found
app.use(({res}) => {
    const messages = 'Impossible d\'acceder a la resource demandée ! vous pouvez essayer une autre URL'
    res.status(404).json({messages})
})

// Launch server on port 3000
app.listen(port,() => console.log(`listening on http://localhost:${port}`));