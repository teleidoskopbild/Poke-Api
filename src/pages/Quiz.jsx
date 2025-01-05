import { useState } from "react";
import { fetchPokemonQuizData } from "../api/pokeApi.js"; // Importiere die fetchPokemonQuizData Funktion

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  function getRandomUniqueIds(count, maxId) {
    const uniqueIds = new Set(); // Set verhindert Duplikate
    while (uniqueIds.size < count) {
      const randomId = Math.floor(Math.random() * maxId) + 1; // IDs von 1 bis maxId
      uniqueIds.add(randomId);
    }
    return Array.from(uniqueIds);
  }

  // Paare generieren
  const generatePairs = async (ids) => {
    const pairs = [];
    const remainingIds = [...ids];

    // Wähle eine richtige Antwort und drei falsche für jede Runde
    const correctId = remainingIds.pop();
    const wrongIds = [];
    while (wrongIds.length < 3) {
      const randomId =
        remainingIds[Math.floor(Math.random() * remainingIds.length)];
      if (!wrongIds.includes(randomId)) {
        wrongIds.push(randomId);
      }
    }

    // Hole Pokémon-Daten
    const allPokemonData = await fetchPokemonQuizData(
      [correctId, ...wrongIds],
      correctId
    );

    // Erstelle das Paar aus der richtigen Antwort und den falschen Antworten
    const pair = allPokemonData.map((data, index) => ({
      ...data,
      id: [correctId, ...wrongIds][index],
    }));
    pair.sort(() => Math.random() - 0.5); // Mische die Optionen

    // Füge das Paar in die Paare-Liste ein
    pairs.push({
      options: pair,
      correctId,
    });

    return pairs;
  };

  // Quiz starten
  const startQuiz = async () => {
    const newIds = getRandomUniqueIds(40, 1010);
    const newPairs = await generatePairs(newIds);
    setPairs(newPairs);
    setQuizStarted(true);
    setCurrentRound(1);
    setScore(0);
    setQuizEnded(false);
  };

  // Antwort prüfen
  const checkAnswer = async (id, correctId) => {
    if (id === correctId) {
      setScore(score + 1); // Erhöhe den Punktestand, wenn die Antwort korrekt ist
    }

    // Wenn 10 Runden gespielt sind, beenden wir das Quiz
    if (currentRound >= 10) {
      setQuizEnded(true);
    } else {
      const newIds = getRandomUniqueIds(40, 1010);
      const newPairs = await generatePairs(newIds);
      setPairs(newPairs);
      setCurrentRound(currentRound + 1);
    }
  };

  // "Play Again"-Button
  const playAgain = () => {
    setQuizStarted(false);
    setPairs([]);
    setCurrentRound(1);
    setScore(0);
    setQuizEnded(false);
  };

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-blue-600">Pokémon Quiz</h1>
      <p className="mt-4 text-lg text-gray-700">
        Test your Pokémon knowledge! Start the quiz and guess the Pokémon names.
      </p>

      {/* Quiz starten Button */}
      {!quizStarted && !quizEnded && (
        <button
          onClick={startQuiz}
          className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Quiz
        </button>
      )}

      {/* Quiz-Status anzeigen */}
      {quizStarted && !quizEnded && (
        <div>
          <h2 className="mt-6 text-2xl">Question {currentRound}</h2>

          {/* Bild des richtigen Pokémon */}
          <div className="mt-6">
            {pairs.map((pair, index) => (
              <div key={index}>
                <img
                  src={
                    pair.options.find((option) => option.id === pair.correctId)
                      ?.image
                  }
                  alt="Correct Pokémon"
                  className="w-48 h-48 mx-auto"
                />
              </div>
            ))}
          </div>

          {/* Optionen mit Namen */}
          <div className="mt-8">
            {pairs.map((pair, index) => (
              <div key={index}>
                {pair.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => checkAnswer(option.id, pair.correctId)}
                    className="w-48 px-4 py-2 m-2 bg-gray-200 hover:bg-blue-300 rounded-md capitalize"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-4">Current score: {score}</p>
        </div>
      )}

      {/* Quiz beenden und Endpunktzahl anzeigen */}
      {quizEnded && (
        <div>
          <h2 className="mt-6 text-2xl">Quiz finished!</h2>
          <p>Your Final Score: {score}</p>
          <button
            onClick={playAgain}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
