import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const PokemonList = ({ pokemonList, handlePokemonClick, pokemonId }) => (
  <Row xs={1} sm={2} md={3} lg={4} className="g-4">
    {pokemonList.map((pokemon, index) => (
      <Col key={pokemon.name}>
        <Card onClick={() => handlePokemonClick(pokemon)}>
          <Card.Img
            variant="top"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId + index + 1}.png`}
          />
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default PokemonList;
