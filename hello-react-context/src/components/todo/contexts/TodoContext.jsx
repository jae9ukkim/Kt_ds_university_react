// require 는 CommonJS. react에서 지원하지 않음
// import { createContext } require("react");
import { createContext, useState } from "react";

export const TodoContext = createContext({
  todos: [],
  done(todoId) {},
  allDone(doneStatus) {},
  addTodo(taskName, dueDate, priority) {},
  getTodo(todoId) {},
});

// TodoContext를 제공하는 컴포넌트
const TodoContextProvider = ({ children }) => {
  const todoData = [
    {
      id: "todo_1",
      todo: "React Component Master",
      dueDate: "2026-04-22",
      priority: 1,
      isDone: true,
    },
    {
      id: "todo_2",
      todo: "React Component Master 2",
      dueDate: "2026-04-23",
      priority: 2,
      isDone: false,
    },
    {
      id: "todo_3",
      todo: "React Component Master 3",
      dueDate: "2026-04-24",
      priority: 3,
      isDone: false,
    },
  ];
  const [cachedData, setCachedData] = useState(todoData);

  // value에 전달할 객체
  const todoContextProps = {
    todos: cachedData,
    done(todoId, doneStatus) {
      setCachedData((prevData) => {
        // const newStateMemory = [...prevData];
        // java for each
        //   for (const todo of newStateMemory) {
        //     if (todo.id === todoId) {
        //       todo.isDone = doneStatus;
        //       break;
        //     }
        //   }
        const newStateMemory = prevData.map((todo) => {
          if (todo.id === todoId) {
            todo.isDone = doneStatus;
          }
          return todo;
        });
        return newStateMemory;
      });
    },
    allDone(doneStatus) {
      setCachedData((prevData) => {
        // chachedData를 반복하면서 모든 isDone의 값을 변경한다.
        // {}가 function의 body가 아니라 객체임을 알리기 위해 ()사용
        const newData = prevData.map((todo) => ({
          ...todo,
          isDone: doneStatus,
        }));
        // 변경된 결과를 반환한다.
        return newData;
      });
    },
    addTodo(taskName, dueDate, priority) {
      setCachedData((prevData) => [
        ...prevData,
        {
          id: `todo_${prevData.length + 1}`,
          todo: taskName,
          dueDate,
          priority,
          isDone: false,
        },
      ]);
    },
    getTodo(todoId) {
      const todo = cachedData.find((eachTodo) => eachTodo.id === todoId); // filter의 결과는 array. array에는 find, map등 사용할 수 있다
      return todo;
    },
  };

  // Context의 Provider 값을 공유받을 수 있는 컴포넌트는
  // Context.Provider의 자식 컴포넌트만 대상.(부모, 형제 불가능)
  return (
    <TodoContext.Provider value={todoContextProps}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
