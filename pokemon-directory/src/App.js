import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonList();
  }, []);

  const handlePokemonClick = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(pokemonList);

  return (
<div>
      <h1>Pokemon Directory</h1>
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <h3>Abilities</h3>
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
        </div>
      )}
    </div>
  );
}

export default App;
