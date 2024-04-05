import { fetchRandomPokemon, toggleComparisonList, fetchPokemonByRegion, filterPokemonList, fetchPokemonForComparison } from './data/api.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const compareBtn = document.getElementById('compareBtn');
  const searchInput = document.getElementById('searchInput');
  const regionSelect = document.getElementById('regionSelect');

  generateBtn.addEventListener('click', fetchRandomPokemon);
  compareBtn.addEventListener('click', toggleComparisonList);
  searchInput.addEventListener('input', filterPokemonList);
  regionSelect.addEventListener('change', fetchPokemonByRegion);
});