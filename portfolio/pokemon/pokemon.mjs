// Importing api/data functions from another js file.
import { displayPokemonInfo } from './models/pokemon-data.mjs';
import { getUserInput } from './utilities/util.mjs';

// Function for the main menu
async function getPokemon() {
    let menuFlag = false;
    while (!menuFlag) { 
        try {
            const menu = "\nWelcome to the main menu. Please select an option below:\n" + "1 - View stats for a Pokemon\n" + "0 - Exit\n";
            const userChoice = await getUserInput(menu);

            if (userChoice === '0') {
                console.log('\nGoodbye.');
                break;
            } else if (userChoice === '1') {
                displayPokemonInfo();
                break;
            } else {
                console.log("\nERROR. Enter 0 or 1");
            }
        } catch (menuError) {
            console.log("Issue with main menu. Closing application..", menuError)
        }
    }
}

// Calling functions
getPokemon();