import React from 'react';

const PokemonDetails = ({ selectedPokemon, handleCloseModal }) => (
  <div className="pokemon-details">
    <h2>{selectedPokemon.name}</h2>
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon.id}.png`}
      alt={selectedPokemon.name}
      className="pokemon-image"
    />
    <h3>Height: {selectedPokemon.height}</h3>
    <h3>Weight: {selectedPokemon.weight}</h3>
    <h3>Abilities:</h3>
    <ul>
      {selectedPokemon.abilities.map((ability) => (
        <li key={ability.ability.name}>{ability.ability.name}</li>
      ))}
    </ul>
    <button className="close-button" onClick={handleCloseModal}>
      Close
    </button>
  </div>
);

export default PokemonDetails;
