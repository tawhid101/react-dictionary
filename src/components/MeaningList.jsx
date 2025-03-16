const MeaningList = ({ word, meanings = [] }) => {
  return (
    <li key={Math.random() * 1000}>
      <div>
        <p>
          {word && <span>Word:</span>} {word}
        </p>
      </div>
      {meanings.map((meaning) => (
        <>
          <p>
            <span>Parts of Speech:</span> {meaning.partOfSpeech}
          </p>
          <span>Definitions</span>
          <div className="definitions-container">
            <ul>
              {meaning.definitions.map((definition) => (
                <li key={definition.definition} className="definition-list">
                  {definition.definition}
                </li>
              ))}
            </ul>
          </div>
        </>
      ))}
    </li>
  );
};

export default MeaningList;
