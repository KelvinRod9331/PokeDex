import axios from 'axios'
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";


const getAllPokemon = () => axios.get(proxyUrl+targetUrl);

const getPokemonInfo = name => axios.get(proxyUrl +`http://pokeapi.co/api/v2/pokemon/${name}`);

const getPokemonSpecies = id => axios.get(proxyUrl +`https://pokeapi.co/api/v2/pokemon-species/${id}/`)

const getPokemonEvolution = id => axios.get(proxyUrl +`https://pokeapi.co/api/v2/evolution-chain/${id}/`)


export default {
  getAllPokemon,
  getPokemonInfo,
  getPokemonSpecies,
  getPokemonEvolution,
};

