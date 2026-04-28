import { useState } from "react";
import trend from "./trend.json";
import TrendHeader from "./TrendHeader";
import TrendBox from "./TrendBox";
import TrendList from "./TrendList";
import TrendItem from "./TrendItem";

const TmdbMain = () => {
  // state
  const {
    sectionName,
    selectorsKR,
    selectors,
    items: { today, week },
  } = trend;

  const [trendSelector, setTrendSelector] = useState();

  // functions
  const onClickTrendSelectorHandler = () => {};

  return (
    <TrendBox>
      <TrendHeader></TrendHeader>
      <TrendList>
        <TrendItem></TrendItem>
      </TrendList>
    </TrendBox>
  );
};

export default TmdbMain;
