import { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import MeaningList from "./components/MeaningList";

/**
 * The App component renders a dictionary application that allows users to search for
 * the meaning of a word. It includes an input field for word entry, a submit button
 * to trigger the search, and displays the fetched word data including its meanings,
 * phonetic representation, and any errors encountered during the fetch process.
 * The component manages the fetch operation with loading and error states, and
 * processes and formats the fetched data for display using a utility function.
 */
function App() {
  const wordInput = useRef();
  const [initialrun, setInitialRun] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [fetchedData, setFetchedData] = useState({});
  const [error, setError] = useState("");

  const { word, meanings } = fetchedData;

  useEffect(() => {
    if (initialrun || !searchWord) {
      return;
    }

    async function fetchWord() {
      setError("");
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.title || "Failed to fetch data");
        }

        const data = await response.json();

        if (!data || !data.length) {
          throw new Error("No definition found for this word");
        }

        setFetchedData({
          word: data[0].word,
          meanings: data[0].meanings,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setFetchedData({});
        setLoading(false);
      }
    }

    fetchWord();
  }, [searchWord, initialrun]);

  function handleSubmit(e) {
    e.preventDefault();
    if (wordInput.current.value === searchWord) {
      wordInput.current.value = "";
      return;
    }
    setInitialRun(false);
    setError("");
    setFetchedData({});
    setSearchWord(wordInput.current.value);
    wordInput.current.value = "";
  }

  return (
    <>
      <h1>Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <input ref={wordInput} type="text" placeholder="Enter a word" />
        <button type="submit">Search</button>
      </form>
      {!error ? (
        <div className="list-container">
            <MeaningList word={word} meanings={meanings} />
        </div>
      ) : (
        <p>{error}</p>
      )}
      {loading && <p>Loading...</p>}
    </>
  );
}

export default App;
