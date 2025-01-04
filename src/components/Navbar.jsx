import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex gap-4">
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
    </nav>
  );
}
