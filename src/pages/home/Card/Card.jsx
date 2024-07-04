import React, { useState, useEffect } from 'react'
import css from './card.module.scss'
import { URL_POKEMON } from '../../../api/apiRest.js';
import axios from 'axios';

const Card = ({card}) => {

    const [pokeObject, setPokeObject] = useState({});

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const apiPokemon = await axios.get(`${URL_POKEMON}/${card.name}`);
                setPokeObject(apiPokemon.data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemon();
    }, []);
    

    return (
        <div>
            {/* .sprites.other["official-artwork"].front_default
            This is how the data comes from the api, to see it, do a console.log(pokeObject)
            and look for the path, meaning, go to sprites, other, etc. We are just accessing the data in the object */}
            <img src={pokeObject?.sprites?.other["official-artwork"]?.front_default} alt='pokemonImage'/>
        </div>
    )
}

export default Card