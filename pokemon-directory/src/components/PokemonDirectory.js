import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import PokemonDetails from './PokemonDetails';
import '../styles/PokemonDirectory.css';

const PokemonDirectory = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [pokemonId, setPokemonId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const limit = 20;

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
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrevPage = () => {
        if (offset > 0) {
            setOffset(offset - limit);
            setPokemonId((prevValue) => prevValue - 20);
        }
    };

    const handleNextPage = () => {
        if (offset + limit < total) {
            setOffset(offset + limit);
            setPokemonId((prevValue) => prevValue + 20);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className="pokemon-directory">
            <h1>Pokemon Directory</h1>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {!showModal && (
                        <>
                            <PokemonList pokemonList={pokemonList} handlePokemonClick={handlePokemonClick} pokemonId={pokemonId} />
                            <Pagination handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} offset={offset} limit={limit} total={total} />
                        </>
                    )}
                </>
            )}
            {showModal && <PokemonDetails selectedPokemon={selectedPokemon} handleCloseModal={handleCloseModal} />}
        </Container>

    );
};

export default PokemonDirectory;
