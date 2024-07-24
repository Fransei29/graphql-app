const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const { sequelize } = require('./models/models');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Configurar el transportador de nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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