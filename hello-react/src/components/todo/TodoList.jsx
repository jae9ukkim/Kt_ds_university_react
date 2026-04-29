import { useContext } from "react";
import TodoContext from "./contexts/TodoContext";
import TodoItem, { TodoItemForChildren } from "./TodoItem";

const TodoList = ({ children }) => {
  console.log("TodoList");
  const { componentName } = useContext(TodoContext);

  if (!componentName || componentName !== "TodoGrid") {
    return <></>;
  }

  const providerProps = {
    componentName: "TodoList",
  };

  // todoData가 없다면 데이터가 없다.
  // react는 반환하는 tag가 하나여야 한다.
  return (
    <TodoContext.Provider value={providerProps}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoList;
