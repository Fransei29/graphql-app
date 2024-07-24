import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, setPosts }) => {
  const handleDelete = async () => {
    try {
      await axios.post('http://localhost:3000/graphql', {
        query: `
          mutation DeletePost($id: Int!) {
            deletePost(id: $id)
          }
        `,
        variables: { id: postId }
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeletePost;
