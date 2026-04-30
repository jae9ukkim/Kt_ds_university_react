/** @format */
// 다른 폴더에 있는 component 가져오는 방법
import ArticleMain from "./components/articles/ArticleMain.jsx";

import TodoMain from "./components/todo/TodoMain.jsx";
import Counter from "./components/assignment/Counter.jsx";
import Calc from "./components/assignment/Calc.jsx";
import TrendBox from "./components/movieTrend/TrendBox.jsx";
import { ReactReduxProvider } from "./stores/redux/ReactReduxProvider.jsx";
import { ToolkitProvider } from "./stores/toolkit/ToolkitProvider.jsx";

export default function App() {
  return (
    <ToolkitProvider>
      <TodoMain />;
    </ToolkitProvider>
  );
}
