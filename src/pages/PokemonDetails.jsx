import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const navigate = useNavigate();

  function goBack() {
    navigate(-1); // Geht zur vorherigen Seite
  }

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="text-center py-10">
      {/* Pokemon Name */}
      <h1 className="text-4xl font-bold capitalize mb-6">{pokemon.name}</h1>

      {/* Pokemon Image */}
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="mx-auto w-60 h-60 mb-6"
      />

      {/* Pokemon Details */}
      <div className="space-y-4 text-xl">
        <p>
          <strong>Height:</strong> {pokemon.height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight / 10} kg
        </p>
        <p>
          <strong>Base Experience:</strong> {pokemon.base_experience}
        </p>
        <p>
          <strong>Types:</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <p>
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={goBack}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Back to List
      </button>
    </div>
  );
}
