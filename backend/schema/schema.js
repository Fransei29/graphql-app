const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean } = graphql;
const { Author, Post } = require('../models/models');
const { Op } = require('sequelize'); // Importa Op de Sequelize para usar operadores
const nodemailer = require('nodemailer'); //Para el envio de correos electronicos

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4 // Forzar el uso de IPv4
});



// Definición del tipo Author en GraphQL
const authorType = new GraphQLObjectType({
  name: 'Author', 
  fields: {                                  // Campos del tipo Author
    name: { type: GraphQLString }, 
    age: { type: GraphQLInt },
    imageFileName: { type: GraphQLString }
  }
});

// Definición del tipo Post en GraphQL
const postType = new GraphQLObjectType({
  name: 'Post', 
  fields: {                                  // Campos del tipo Post
    title: { type: GraphQLString }, 
    description: { type: GraphQLString }, 
    author: {
      type: authorType, 
      resolve: async (source) => {           // Resolver para obtener el autor de un post buscado por ID
        return await Author.findByPk(source.authorId); 
      }
    }
  }
});

// Definición del tipo de consulta principal en GraphQL
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // Definición del campo 'post' para obtener un único post por su ID
    post: {
      type: postType,                                // Tipo de dato que devuelve esta consulta
      args: { id: { type: GraphQLInt } },            // Argumentos que recibe esta consulta
      resolve: async (source, { id }) => {           // Función resolver para obtener un post por ID
        return await Post.findByPk(id);              // Busca un post por su clave primaria (ID)
      }
    },
    // Definición del campo 'posts' para obtener una lista de posts
    posts: {
      type: new GraphQLList(postType),                // Tipo de dato que devuelve esta consulta (lista de posts)
      args: {
        title: { type: GraphQLString }                // Argumento opcional para filtrar los posts por título
      },
      resolve: async (source, { title }) => {          // Función resolver para obtener los posts
        const where = title ? { title: { [Op.iLike]: `%${title}%` } } : {}; // Si se proporciona un título, crea un objeto `where` con el operador `iLike` para buscar títulos que contengan la cadena proporcionada
        return await Post.findAll({ where });          // Busca todos los posts que coincidan con el criterio de búsqueda                                                           
      }
    }
  }
});

// Definición de las mutaciones en GraphQL (crear y eliminar)
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: postType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (source, args) => {
        return await Post.create(args);
      }
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (source, { id }) => {
        const post = await Post.findByPk(id);
        if (!post) {
          throw new Error('Post not found');
        }
        await post.destroy();
        return true;
      }
    },
    sendEmail: {
      type: GraphQLString,
      args: {
        subject: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (source, { subject, message }) => {
        try {
          console.log('Intentando enviar correo a:', 'seilerfranco318@gmail.com');
          const result = await transporter.sendMail({
            from: `"Tu Nombre" <${process.env.SMTP_USER}>`,
            to: 'seilerfranco318@gmail.com', // Destinatario fijo
            subject: subject,
            html: message,
          });
          console.log('Correo enviado:', result);
          return 'Correo enviado correctamente';
        } catch (error) {
          console.error('Error enviando el correo:', error);
          throw new Error('Error enviando el correo: ' + error.message);
        }
      }
    }
  }
});

// Creación del esquema GraphQL
const schema = new GraphQLSchema({
  query: queryType,                      // Asigna el tipo de consulta al esquema
  mutation: mutationType
});

// Exportación del esquema para usarlo en el servidor
module.exports = schema; 
