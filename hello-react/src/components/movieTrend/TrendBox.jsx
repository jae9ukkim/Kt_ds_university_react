import { useState } from "react";
import TrendHeader from "./TrendHeader";
import TrendItem from "./TrendItem";
import TrendList from "./TrendList";
import TrendSelector from "./TrendSelector";
import trend from "./trend.json";

const TrendBox = () => {
  const {
    sectionName,
    selectorsKR,
    selectors,
    items: { today, week },
  } = trend;

  const [showData, setShowData] = useState(today);

  const onClickButtonHandler = (event) => {
    if (event.target.value === "today") {
      setShowData(today);
    } else {
      setShowData(week);
    }
  };

  return (
    <div className="wrapper">
      <TrendHeader section={sectionName}>
        <TrendSelector
          selectorsKR={selectorsKR}
          selectors={selectors}
          onClickButton={onClickButtonHandler}
        />
      </TrendHeader>
      <TrendList>
        <>
          {showData.map((movie) => {
            return <TrendItem key={movie.key} movie={movie} />;
          })}
        </>
      </TrendList>
    </div>
  );
};

export default TrendBox;
