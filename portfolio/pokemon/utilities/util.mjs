// Importing functions
import readline from 'readline';

// Function to get user input from the console
async function getUserInput(promptText) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question(promptText, (input) => {
            rl.close();
            resolve(input);
        });
    });
}

// Exporting functions
export { getUserInput };