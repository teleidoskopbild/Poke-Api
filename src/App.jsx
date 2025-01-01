import { useState, useEffect } from "react";
import { fetchPokemonByGeneration } from "./api/pokeApi";

function App() {
  const [generation, setGeneration] = useState(1);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      try {
        const genPokemon = await fetchPokemonByGeneration(generation);

        // Hole die Details zu jedem Pokémon
        const pokemonDetails = await Promise.all(
          genPokemon.results.map(async (poke) => {
            const res = await fetch(poke.url); // Abruf der Detaildaten
            return await res.json();
          })
        );

        setPokemon(pokemonDetails);
      } catch (error) {
        console.error(error);
      }
    }
    getPokemon();
  }, [generation]);
  return (
    <div>
      <h1>Pokémon by Generations</h1>

      {/* Buttons für die Generationen */}
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            onClick={() => setGeneration(gen)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: gen === generation ? "lightblue" : "white",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            Gen {gen}
          </button>
        ))}
      </div>

      {/* Pokémon-Liste mit Bildern und Namen */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pokemon.map((poke) => (
          <li
            key={poke.id}
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              style={{ width: "150px", height: "150px", marginRight: "10px" }}
            />
            {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
