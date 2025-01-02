import { useState, useEffect } from "react";

export default function Home() {
  const [randomPokemon, setRandomPokemon] = useState(null);

  useEffect(() => {
    const getRandomPokemon = () => {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      setRandomPokemon(randomId);
    };

    // Zufälliges Pokémon setzen, wenn die Seite geladen wird
    getRandomPokemon();
  }, []);

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to the Pokémon World!
      </h1>
      <p className="mt-4 text-xl text-gray-700">
        Discover Pokémon from different generations and explore their details.
      </p>
      <p className="mt-2 text-lg text-gray-500">
        Click on the Pokémon-List link to get started and view your favorite
        Pokémon!
      </p>
      <div className="mt-6">
        {randomPokemon ? (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemon}.png`}
            alt={`Pokemon ${randomPokemon}`}
            className="mx-auto w-48 h-48"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
