import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Tugas 5 - React Hooks Pokédex</h1>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
