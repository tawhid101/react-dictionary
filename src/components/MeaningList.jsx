const MeaningList = ({ word, meanings = [] }) => {
  return (
    <li key={Math.random()*1000}>
      <div>
        <p>
          {word && <span>Word:</span>} {word}
        </p>
        {/* <p>
          {phonetic && <span>Phonetic:</span>} {phonetic}
        </p> */}
      </div>
      {meanings.map((meaning) => (
        <>
          <p>
            <span>Parts of Speech:</span> {meaning.partOfSpeech}
          </p>
          <span>Definitions:</span>
          <div className="definitions-container">
            <ul>
              {meaning.definitions.map((definition) => (
                <li key={definition.definition}>{definition.definition}</li>
              ))}
            </ul>
          </div>
        </>
      ))}
    </li>
  );
};

export default MeaningList;
