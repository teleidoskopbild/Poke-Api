import { useState, useEffect } from "react";
import { fetchPokemonByGeneration } from "../api/pokeApi";
import { Link } from "react-router-dom";

function List() {
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
      <h1 className="text-center text-3xl font-bold my-6">
        Pokémon by Generations
      </h1>

      {/* Buttons für die Generationen */}
      <div className="text-center my-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            onClick={() => setGeneration(gen)}
            className={`px-4 py-2 m-2 rounded border ${
              gen === generation
                ? "bg-blue-600 text-white"
                : "bg-white text-black border-gray-400"
            } hover:bg-blue-300 transition`}
          >
            Gen {gen}
          </button>
        ))}
      </div>

      {/* Pokémon-Liste mit Bildern und Namen */}
      <ul className="flex flex-wrap gap-4 justify-center list-none p-0">
        {pokemon.map((poke) => (
          <li
            key={poke.id}
            className="text-center flex flex-col items-center m-6"
          >
            <Link to={`/pokemon/${poke.id}`}>
              <img
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                className="w-36 h-36"
              />
              <span className="text-lg font-semibold capitalize">
                #{poke.id.toString().padStart(3, "0")} {poke.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
