import React, { useState } from 'react';
import axios from 'axios';

const SearchPost = ({ setPosts }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

  // Maneja el evento de envío del formulario
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/graphql', {  // Solicitud POST a la API GraphQL
        query: `
          query SearchPost($title: String) {
            posts(title: $title) {
              title
              description
              author {
                name
                age
                imageFileName
              }
            }
          }
        `,
        variables: { title: searchTerm }         // Pasa el término de búsqueda como variable
      });
      setPosts(response.data.data.posts);        // Actualiza el estado de los posts con los resultados de la búsqueda
    } catch (error) {
      console.error('Error searching for post:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for a post by title..." 
        value={searchTerm}                              // Valor del campo de entrada ligado al estado searchTerm
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado searchTerm cuando el usuario escribe en el campo de entrada
      />
      <button type="submit">Search</button> 
    </form>
  );
};

export default SearchPost;
