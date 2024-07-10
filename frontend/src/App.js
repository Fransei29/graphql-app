import React from 'react';
import Posts from './components/Posts'; // Importamos el componente Posts

function App() {
  return (
    <div className="App">
      <h1>Welcome to a Post's place!</h1>
      <Posts /> {/* Usamos el componente Posts para mostrar los posts */}
    </div>
  );
}

export default App; // Exportamos el componente App
