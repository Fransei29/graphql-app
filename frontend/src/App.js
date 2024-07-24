import React from 'react';
import Posts from './components/Posts'; // Importamos el componente Posts
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="App">
      <h1>Welcome to a Post's place!</h1>
      <Posts />
    </div>
  );
}

function Contact() {
  return (
    <div className="ContactForm">
      <h1>Any question? Mail me!</h1>
      <ContactForm />
    </div>
  );
}

export { App, Contact };
