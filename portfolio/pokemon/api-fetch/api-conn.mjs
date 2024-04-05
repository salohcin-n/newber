// Importing functions
import fetch from 'node-fetch';
import { getUserInput } from '/GitHub/api/utilities/util.mjs';

// Fetching and passing user input to the pokemon API for stats
async function fetchPokemonData() {
    try {
        const pokemonInput = await getUserInput('Please enter a Pokemon name or Pokedex ID: ');
        if (!pokemonInput) {
            throw new Error('No Pokemon name entered.');
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.toLowerCase()}`);
        while (!response.ok) {
            throw new Error('Pokemon not found. Please try again.\n');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching Pokemon data: ${error.message}`);
    }
}

// Exporting functions
export { fetchPokemonData };