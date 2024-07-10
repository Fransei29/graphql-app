const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql;
const { Author, Post } = require('../models/models');

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
  name: 'Query',                           // Nombre del tipo de consulta
  fields: {                                // Campos del tipo de consulta
    post: {
      type: postType,                      // Tipo de dato que devuelve esta consulta
      args: { id: { type: GraphQLInt } },  // Argumentos que recibe esta consulta
      resolve: async (source, { id }) => {  // Resolver para obtener un post por ID
        return await Post.findByPk(id);
      }
    },
    posts: {
      type: new GraphQLList(postType),   // Tipo de dato que devuelve esta consulta (lista de posts)
      resolve: async () => {              // Resolver para obtener todos los posts
        return await Post.findAll();
      }
    }
  }
});

// Creación del esquema GraphQL
const schema = new GraphQLSchema({
  query: queryType                      // Asigna el tipo de consulta al esquema
});

// Exportación del esquema para usarlo en el servidor
module.exports = schema; 
