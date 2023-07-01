import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';

import '../styles/PokemonDirectory.css';

const PokemonDirectory = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [pokemonId,setPokemonId] = useState(0)

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        setPokemonList(response.data.results);
        setTotal(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonList();
  }, [offset, limit]);

  const handlePokemonClick = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
      setPokemonId(prevalu=>prevalu - 20)
    }
  };

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset(offset + limit);
      setPokemonId(prevalu=>prevalu + 20)
    }
  };



  return (
    <Container className="pokemon-directory">
      <h1>Pokemon Directory</h1>
      {loading ? (
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {pokemonList.map((pokemon,index) => (
              <Col key={pokemon.name}>
                <Card onClick={() => handlePokemonClick(pokemon)}>
                  <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId+ index+1}.png`} />
                  <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <Button variant="light" onClick={handlePrevPage} disabled={offset === 0}>
              <BsArrowLeft />
              Prev
            </Button>
            <Button variant="light" onClick={handleNextPage} disabled={offset + limit >= total}>
              Next
              <BsArrowRight />
            </Button>
          </div>
        </>
      )}
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon.id}.png`} alt={selectedPokemon.name} className="pokemon-image" />
          <h3>Height: {selectedPokemon.height}</h3>
          <h3>Weight: {selectedPokemon.weight}</h3>
          <h3>Abilities:</h3>
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default PokemonDirectory;
