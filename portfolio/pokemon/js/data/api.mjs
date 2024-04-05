// Variables
const pokemonInfo = document.querySelector('.pokemon-info .info p');
const pokemonImage = document.getElementById('pokemonImage');
const comparisonList = document.getElementById('comparisonList');
const pokemonDropdown = document.getElementById('pokemonDropdown');

// Proxy server URL
const proxyUrl = '';

// Exported functions
export function fetchRandomPokemon() {
    pokemonImage.style.display = 'flex';
    const randomId = Math.floor(Math.random() * 898) + 1; // 898 Pokemon in total
    const url = `${proxyUrl}https://pokeapi.co/api/v2/pokemon/${randomId}`;
    const isShiny = Math.random() < 0.1;// 10% chance to be shiny.

    pokemonInfo.innerHTML = '<p>Loading...</p>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const name = data.name;
            const imageUrl = isShiny ? data.sprites.front_shiny : data.sprites.front_default;
            const shinyText = isShiny ? 'Shiny ' : ''; // Add shiny text if the Pokemon is shiny
            const height = data.height;
            const weight = data.weight;
            const speciesUrl = `${proxyUrl}${data.species.url}`;
            const abilities = data.abilities.map(ability => ability.ability.name).join(', '); // Extract abilities
            const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>'); // Extract stats

            // Fetching species data from url
            fetch(speciesUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch species data');
                    }
                    return response.json();
                })
                .then(speciesData => {
                    const speciesType = speciesData.genera.find(genus => genus.language.name === 'en').genus;

                    const image = new Image(); // Create a new image element
                    image.onload = () => { // Execute when the image is fully loaded
                        const pokemonHtml = `
                            <h2>${shinyText}${name}</h2>
                            <img src="${imageUrl}" alt="${name}" width="200" height="200">
                            <p><strong>Height:</strong> ${height}</p>
                            <p><strong>Weight:</strong> ${weight}</p>
                            <p><strong>Species:</strong> ${speciesType}</p>
                            <p><strong>Abilities:</strong> ${abilities}</p>
                            <p><strong>Stats:</strong><br> ${stats}</p>`;
        
                        pokemonInfo.innerHTML = pokemonHtml;
                    };
                    image.src = imageUrl; // Set the source of the image to trigger loading
                })
                .catch(error => {
                    console.error('Error fetching species data:', error);
                    pokemonInfo.innerHTML = '<p>Error fetching species data</p>';
                });
        })
        .catch(error => {
            console.error('Error fetching Pokemon:', error);
            pokemonInfo.innerHTML = '<p>Error fetching Pokemon data</p>';
        });
}

export function toggleComparisonList() {
    if (comparisonList.style.display === 'none') {
        comparisonList.style.display = 'block';
        fetchPokemonForComparison();
    } else {
        comparisonList.style.display = 'none';
    }
}

export function fetchPokemonForComparison() {
    const url = `${proxyUrl}https://pokeapi.co/api/v2/pokemon/?limit=898`; // Fetch all Pokemon

    pokemonDropdown.innerHTML = '<option>Loading...</option>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemon = data.results;
            const pokemonOptions = pokemon.map((p, index) => `<option value="${index + 1}">${index + 1}. ${p.name}</option>`).join('');
            pokemonDropdown.innerHTML = pokemonOptions;
        })
        .catch(error => {
            console.error('Error fetching Pokemon for comparison:', error);
            pokemonDropdown.innerHTML = '<option>Error fetching Pokemon data</option>';
        });
}

export function fetchPokemonByRegion() {
    const region = regionSelect.value;
    const url = `${proxyUrl}https://pokeapi.co/api/v2/pokemon/${region}/`;

    pokemonDropdown.innerHTML = '<option>Loading...</option>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemon = data.pokemon_entries;
            const pokemonOptions = pokemon.map((p, index) => `<option value="${p.entry_number}">${p.pokemon_species.name}</option>`).join('');
            pokemonDropdown.innerHTML = pokemonOptions;
        })
        .catch(error => {
            console.error(`Error fetching Pokemon from ${region}:`, error);
            pokemonDropdown.innerHTML = '<option>Error fetching Pokemon data</option>';
        });
}

export function filterPokemonList() {
    const searchText = searchInput.value.toLowerCase();
    const options = pokemonDropdown.getElementsByTagName('option');

    for (let option of options) {
        const text = option.text.toLowerCase();
        if (text.includes(searchText)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    }
}
