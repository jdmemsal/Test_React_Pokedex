import React, { useEffect, useState } from 'react'
import css from './layout.module.scss'
import Header from '../Header/Header'
import axios from 'axios'
import { URL_POKEMON } from '../../../api/apiRest'
import Card from '../Card/Card'

const LayoutHome = () => {

  const [pokemonList, setpokemonList] = useState([]);

  useEffect(() => {
    
    const api = async () =>{
      try {
        const apiPokemons = await axios.get(`${URL_POKEMON}`);
        setpokemonList(apiPokemons.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    }
    
    api();

  }, [])
  

  return (
    <div className={css.layout}>
      <Header/>
      <div className={css.card_content}>
        {pokemonList.map((card, index) => {
          return <Card key={index} card={card}/>;
        })}
      </div>
    </div>
    
  )
}

export default LayoutHome