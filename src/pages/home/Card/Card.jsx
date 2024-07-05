import React, { useState, useEffect } from 'react'
import css from './card.module.scss'
import { URL_POKEMON, URL_SPECIES } from '../../../api/apiRest.js';
import axios from 'axios';

const Card = ({card}) => {

    const [pokeObject, setPokeObject] = useState({});
    const [pkSpecie, setPkSpecie] = useState({});


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

    
    useEffect(() => {
        const spPokemon = async () => {
            try {
                const idUrl = card.url.split("/");
                const apiPokemon = await axios.get(`${URL_SPECIES}/${idUrl[6]}`);

                setPkSpecie(apiPokemon.data);

            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        spPokemon();
    }, []);


    return (
        <div className={css.cards}>
            {/* .sprites.other["official-artwork"].front_default
            This is how the data comes from the api, to see it, do a console.log(pokeObject)
            and look for the path, meaning, go to sprites, other, etc. We are just accessing the data in the object */}
            <img className={css.img_pk} src={pokeObject?.sprites?.other["official-artwork"]?.front_default} alt='pokemonImage'/>
            
            <div className={css.sub_cards}>
                <h4><strong className={css.id_pk}>number</strong></h4>
                <h3><strong className={css.name_pk}>name</strong></h3>
                <p className={css.size_pk}>size</p>
                <p className={css.weight_pk}>weight</p>
                <p className={css.habitat_pk}>habitat</p>

                {/*stats*/}
                <div>
                    {pokeObject?.stats?.map((att, index) => {
                        return(
                            <h5 key={index}>
                                <span>{att.stat.name}</span>
                                <progress value={att.base_stat} max={120}></progress>
                                <span>{att.base_stat}</span>
                            </h5>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card