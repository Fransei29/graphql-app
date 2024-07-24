import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `
          mutation SendEmail($subject: String!, $message: String!) {
            sendEmail(subject: $subject, message: $message)
          }
        `,
        variables: {
          subject: subject,
          message: message,
        },
      });
      setStatus(response.data.data.sendEmail);
    } catch (error) {
      setStatus('Error enviando el correo');
      console.error('Error enviando el correo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Asunto:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mensaje:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar Correo</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ContactForm;
