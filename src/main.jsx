import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import PokemonDetails from "./pages/PokemonDetails.jsx";
import "./index.css";
import App from "./App.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pokemon",
        element: <List />,
      },
      {
        path: "pokemon/:id",
        element: <PokemonDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
