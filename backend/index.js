const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const { sequelize } = require('./models/models');
const cors = require('cors');

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,  // Habilitar la interfaz de GraphiQL para pruebas
}));

sequelize.authenticate().then(() => {
  console.log('Database connected!');
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});