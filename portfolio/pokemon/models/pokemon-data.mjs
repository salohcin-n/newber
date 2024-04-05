// Importing functions
import { fetchPokemonData } from '/GitHub/api/api-fetch/api-conn.mjs'

// Function to display Pokemon information in the console
async function displayPokemonInfo() {
    let userInput;
    let pokemonData;
    let isPokemonFound = false;
    while (!isPokemonFound) {
        try {
            userInput = await fetchPokemonData();
            if (!userInput) {
                throw new Error('No Pokemon name entered.');
            }
            
            pokemonData = await userInput;
            break; // Exit the loop if no error occurs
        } catch (error) {
            console.error(error.message);
        }
    }

    console.log('Name:', pokemonData.name);
    console.log('Abilities:');
    pokemonData.abilities.forEach((ability) => {
        console.log('-', ability.ability.name);
    });
    console.log('Base Experience:', pokemonData.base_experience);
}

// Exporting functions
export { displayPokemonInfo };