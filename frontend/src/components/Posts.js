import React, { useEffect, useState } from 'react'; // Importamos React y algunos hooks
import axios from 'axios'; // Importamos Axios para hacer las solicitudes HTTP
import PostForm from './PostForm';
import SearchPost from './SearchPost';
import DeletePost from './DeletePost';


const Posts = () => {
  const [posts, setPosts] = useState([]);       // Estado para almacenar los posts
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null);     // Estado para manejar errores

  useEffect(() => {                         // Usamos useEffect para realizar la solicitud cuando el componente se monta
    const fetchPosts = async () => {
      try {
        const response = await axios.post('http://localhost:3000/graphql', {    // Realizamos una solicitud POST a nuestra API GraphQL
          query: `  
            query GetPosts {
              posts {
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
        });

        setPosts(response.data.data.posts);   // Actualizamos el estado con los datos obtenidos
      } catch (error) {
        setError(error.message);
      } finally {   
        setLoading(false);                    // Una vez que la solicitud se completa (con éxito o error), actualizamos el estado de carga
      }
    };

    fetchPosts();
  }, []);                                     // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente


  if (loading) return <p>Loading...</p>;      // Mostramos un mensaje de carga mientras esperamos la respuesta
  if (error) return <p>Error: {error}</p>;    // Mostramos un mensaje de error si algo sale mal

  return (                                    // Renderizamos los posts obtenidos
    <div className='container'>
      <div className='form-container'>
        <SearchPost setPosts={setPosts} />
        <PostForm setPosts={setPosts} /> 
      </div>
      <div className='card1'>
        {posts.map((post, index) => (
          <div className='card' key={index}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.author.imageFileName && (
              <img src={`/img/${post.author.imageFileName}`} alt={`${post.author.name}'s portrait`} />
            )}
            <h3>Author: {post.author.name} (Age: {post.author.age})</h3>
            <DeletePost postId={post.id} setPosts={setPosts} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts; 
