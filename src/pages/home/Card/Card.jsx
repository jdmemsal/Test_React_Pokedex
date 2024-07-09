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
    }, [card]);

    
    useEffect(() => {
        const spPokemon = async () => {
            try {
                const idUrl = card.url.split("/");
                const apiPokemon = await axios.get(`${URL_SPECIES}/${idUrl[6]}`);
                //const apiPokemon = await axios.get(`${URL_SPECIES}`);

                setPkSpecie(apiPokemon.data);

            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        spPokemon();
    }, [card]);


    return (
        <div className={css.cards_container}>
            {/* .sprites.other["official-artwork"].front_default
            This is how the data comes from the api, to see it, do a console.log(pokeObject)
            and look for the path, meaning, go to sprites, other, etc. We are just accessing the data in the object */}
            <img className={css.img_pk} src={pokeObject?.sprites?.other["official-artwork"]?.front_default} alt='pokemonImage'/>
            
            <div className={css.sub_cards}>
                <h4><strong className={css.id_pk}>Nº {pokeObject.id}</strong></h4>
                <h3><strong className={css.name_pk}>{pokeObject.name}</strong></h3>
                <p className={css.size_pk}>{`${(pokeObject.height * 0.1).toFixed(1)} M`}</p>
                <p className={css.weight_pk}>{`${(pokeObject.weight * 0.1).toFixed(1)} Kg`}</p>
                <p className={css.habitat_pk}>Habitat: {pkSpecie?.habitat?.name}</p>

                {/*stats*/}
                <div className={css.div_stats_container}>
                    {pokeObject?.stats?.map((att, index) => {
                        return(
                            <h5 key={index} className={css.att_stats}>
                                <span className={css.name_stat}>{att.stat.name}</span>
                                <progress value={att.base_stat} max={120}></progress>
                                <span className={css.value_stat}>{att.base_stat}</span>
                            </h5>
                        );
                    })}
                </div>

                <div className={css.div_type_container}>
                    {pokeObject?.types?.map((ty, index) => {
                        return <h6 key={index} className={css.div_type_name}>{ty.type.name}</h6>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card