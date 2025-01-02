export default function Home() {
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
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
          className="mx-auto w-40 h-40"
        />
      </div>
    </div>
  );
}
