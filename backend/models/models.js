const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db'); 

// Configura la conexión a PostgreSQL usando la configuración externa
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

// Definir el modelo Author
const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageFileName: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Definir el modelo Post
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: 'id'
    }
  }
});

module.exports = { sequelize, Author, Post };
