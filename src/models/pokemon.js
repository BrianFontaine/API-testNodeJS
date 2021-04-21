const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
        validate : {
          notEmpty  : {msg: "le nom du pokémons ne peut être Vide "},
          notNull   : {msg: "le nom du pokémons ne peut être null."}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull : false,
        validate  : {
          isInt   : {msg: "Utilisez uniquement des nombres pour les point de vie "},
          notNull : {msg: "Les points de vie ne doivent etre null."},
          max : {
            args : [999],
            msg : "Les points de vie ne peuvent être supperieur a 999"
          },
          min : {
            args : [0],
            msg : "Les points de vie doivent être superieur ou égale à 0"
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull : false,
        validate  : {
          isInt   : {msg: "Utilisez uniquement des nombres pour les point de degat "},
          notNull : {msg: "Les points de dégat ne doivent etre null."},
          max : {
            args : [99],
            msg : "Les points de combats ne peuvent être supperieur a 99"
          },
          min : {
            args : [0],
            msg : "Les points de combats doivent être superieur ou égale à 0"
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull  : false,
        validate   : {
          notEmpty : {msg: "l'url du pokémons ne peut être Vide "},
          notNull  : {msg: "l'url' du pokémons ne peut être null."},
          isUrl    : {msg: "l'url' du pokémons n'est pas correct !"}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        }, 
        set(types){
          this.setDataValue('types',types.join())
        },
        validate : {
          isTypesValid(value){
            if (!value) {
              throw new Error('un pokémons doit au moins avoir un type');
            }
            if (value.split(',').lenght > 3) {
              throw new Error('un pokémons ne peux avoir plus de trois types');
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)){
                throw new Error(`Le type d\'un pokémon doit appartenir à la liste suivante : ${validTypes}`);
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }