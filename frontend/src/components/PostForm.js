import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ setPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `
          mutation CreatePost($title: String!, $description: String!, $authorId: Int!) {
            createPost(title: $title, description: $description, authorId: $authorId) {
              id
              title
              description
              author {
                name
              }
            }
          }
        `,
        variables: {
          title,
          description,
          authorId: parseInt(authorId, 10)
        }
      });
      setPosts((prevPosts) => [...prevPosts, response.data.data.createPost]); // Asegúrate de que setPosts es una función pasada correctamente
      setTitle('');
      setDescription('');
      setAuthorId('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Author ID"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;

