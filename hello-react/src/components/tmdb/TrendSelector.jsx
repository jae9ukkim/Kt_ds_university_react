const TrendSelector = ({ selectorsKR, selectors, onClickButton }) => {
  return (
    <>
      <button type="button" value={selectors[0]} onClick={onClickButton}>
        {selectorsKR[0]}
      </button>
      <button type="button" value={selectors[1]} onClick={onClickButton}>
        {selectorsKR[1]}
      </button>
    </>
  );
};

export default TrendSelector;
