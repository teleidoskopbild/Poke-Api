import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white flex items-center justify-between shadow-lg">
      <ul className="flex gap-4 text-lg font-medium">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/pokemon" className="hover:underline">
            Pokémon-List
          </Link>
        </li>
        <li>
          <Link to="/quiz" className="hover:underline">
            Quiz
          </Link>
        </li>
      </ul>
      <a
        href="https://pokeapi.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-block"
      >
        <img
          src="/Poke-Api/pokeapi.svg"
          alt="PokéAPI Logo"
          className="mr-4 w-36 h-18 p-0"
        />
      </a>
    </nav>
  );
}
