export async function fetchPokemonByGeneration(gen) {
  const generationConfig = {
    1: { offset: 0, limit: 151 },
    2: { offset: 151, limit: 100 },
    3: { offset: 251, limit: 135 },
    4: { offset: 386, limit: 107 },
    5: { offset: 493, limit: 156 },
    6: { offset: 649, limit: 72 },
    7: { offset: 721, limit: 88 },
    8: { offset: 809, limit: 96 },
    9: { offset: 905, limit: 105 },
  };

  const config = generationConfig[gen];
  if (!config) {
    throw new Error("Ungültige Generation!");
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${config.offset}&limit=${config.limit}`
  );
  const data = await response.json();
  return data;
}
