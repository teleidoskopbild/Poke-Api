import { fetchPokemonQuizData } from "./pokeApi.js"; // Passe den Import an den Speicherort der Datei an

const testFetch = async () => {
  const ids = [1, 2, 3, 4]; // Beispiel-IDs für die Pokémon
  const correctId = 1; // Die richtige Antwort, z.B. Pokémon mit ID 1

  try {
    const data = await fetchPokemonQuizData(ids, correctId);
    console.log(data); // Überprüfe, was zurückgegeben wird
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
};

testFetch();
