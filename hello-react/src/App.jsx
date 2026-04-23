/** @format */
// 다른 폴더에 있는 component 가져오는 방법
import ArticleMain from "./components/articles/ArticleMain.jsx";
import { Counter } from "./components/assignment/counter.jsx";
import TodoMain from "./components/todo/TodoMain.jsx";

export default function App() {
  return <Counter />;
}
