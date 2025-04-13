import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            const data = await res.json();

            const details = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })
            );

        const formatted = details.map(p => ({
            id: p.id,
            name: p.name,
            type: p.types[0].type.name,
            image: p.sprites.other['official-artwork'].front_default,
        }));

        setPokemonList(formatted);
        };

        fetchPokemon();
    }, []);

    const filteredPokemon = pokemonList.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pokemon-app dark">
            <header className="header">
                <img src="/logo.png" alt="Pokémon Logo" className="logo" />

                <div className={`search-container ${showSearch ? 'active' : ''}`}>
                    <button className="search-icon" onClick={() => setShowSearch(!showSearch)}>🔍</button>
                        <input
                        type="text"
                        placeholder="Search Pokémon..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>
            </header>

            <div className="controls">
                <select className="sort-dropdown">
                    <option>Sort by</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            <div className="view-toggle">
                <button
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                    >
                    {/* List Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />
                    </svg>
                </button>

                <button
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                >
                    {/* Grid Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                    </svg>
                </button>
                </div>
            </div>

            <div className={`pokemon-list ${viewMode}`}>
            {filteredPokemon.map(poke => (
            <Link to={`/pokemon/${poke.name}`} key={poke.id} className="pokemon-card">
                <p className="type">{poke.type}</p>
                <img src={poke.image} alt={poke.name} />
                <h4>{poke.name.length > 10 ? (
                <>
                    {poke.name.slice(0, 6)}<br />{poke.name.slice(6)}
                </>
                ) : poke.name}</h4>
                <p className="id">#{poke.id.toString().padStart(4, '0')}</p>
            </Link>
            ))}
            </div>
        </div>
    );
}

export default PokemonList;
