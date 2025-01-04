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

// Funktion zum Abrufen von Pokémon-Details per Id
export async function fetchPokemonDetails(id) {
  if (!id) {
    throw new Error("Eine Pokémon-ID muss angegeben werden!");
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error("Fehler beim Laden der Pokémon-Daten!");
  }

  const data = await response.json();
  return data;
}

// Quiz-Data

export const fetchPokemonQuizData = async (ids, correctId) => {
  const fetchData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return {
        name: data.name,
        image:
          id === correctId
            ? data.sprites.other["official-artwork"].front_default
            : null, // Nur für die richtige Antwort das Bild holen
      };
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return null;
    }
  };

  const promises = ids.map(fetchData); // Hole die Daten für alle IDs

  return Promise.all(promises);
};
