import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';

function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => {
            setPokemon(data);
            setLoading(false);
        });
    }, [name]);

    if (loading) return <p className="loading">Loading...</p>;

    return (
        <div className="pokemon-detail-page dark">
            <div className="detail-header">
                <Link to="/" className="back-button">← Back</Link>
                <h2>{pokemon.name.toUpperCase()}</h2>
            </div>

            <div className="pokemon-detail-card">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
                <div className="pokemon-info">
                    <p><strong>ID:</strong> #{pokemon.id.toString().padStart(4, '0')}</p>
                    <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
                    <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                    <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
