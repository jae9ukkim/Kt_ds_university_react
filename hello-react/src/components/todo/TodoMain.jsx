// ecma function (fat arrow function)
// const : 상수를 정의하는 키워드
// (parameter) => {function body} : fat arrow function
// const abc = () => {}; // 함수를 만들어서 상수에 넣어라

import { useCallback, useEffect, useMemo, useState } from "react";
import { StateTest } from "./StateTest";
import TodoAppender from "./TodoAppender";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import TodoGrid from "./TodoGrid";
import AddCalculator from "./AddCalculator";
import {
  fetchAddTodo,
  fetchAllDoneTodo,
  fetchDoneTodo,
  fetchTodoList,
} from "../../http/todo/fetchTodo";

// function과 fat arrow function의 기능적 차이
// function => 함수를 호출한 대상을 this 객체로 알 수 있다.
// fat arrow function => this 키워드 사용 불가
//                       함수를 호출한 대상을 event 파라미터로만 알 수 있음

// export default 이후에 const 키워드가 나타날 수 없음(규칙)
const TodoMain = () => {
  console.log("TodoMain");
  // const ==> 상수 정의
  // let ==> 변수 정의
  // TODO JSON DATA

  const [cachedData, setCachedData] = useState([]);

  const refreshTodoList = async () => {
    const todoList = await fetchTodoList();

    setCachedData(todoList.body);

    if (todoList.errors) {
      alert(todoList.errors);
    }
  };

  useEffect(() => {
    refreshTodoList();
  }, []);

  const todoCount = useMemo(() => {
    return {
      all: cachedData.length,
      // 완료된 todo만 찾아 그 개수를 반환. filter의 결과는 새로운 배열
      done: cachedData.filter((todo) => todo.done).length,
      // 완료되지 않은 todo만 찾아 그 개수를 반환
      process: cachedData.filter((todo) => !todo.done).length,
    };
  }, [cachedData]);

  const isAllDoneChangeHandler = useCallback(async () => {
    const fetchResult = await fetchAllDoneTodo();
    if (!fetchResult.errors) {
      refreshTodoList();
    } else {
      alert(fetchResult.errors);
    }
  }, []);

  // 특정 todo의 done 값을 반전시키는 함수
  // 이 함수를 TodoList에게 props로 전달
  // TodoList는 TodoItem에게 함수를 props 전달
  const onDoneChangeHandler = async (todoId) => {
    const fetchResult = await fetchDoneTodo(todoId);
    if (!fetchResult.errors) {
      refreshTodoList();
    } else {
      alert(fetchResult.errors);
    }
  };

  const onSaveButtonClickHandler = useCallback(
    async (todo, dueDate, priority) => {
      // console.log("저장합니다.");
      // fetch -> 서버에게 todo를 등록하게 한다.
      const addResult = fetchAddTodo(todo, dueDate, priority);
      if (!addResult.errors) {
        // fetch 완료 이후에 불러오도록.
        refreshTodoList();
      } else {
        alert(addResult.errors);
      }
    },
    [],
  );

  // 컴포넌트가 만들어줄 HTML Tag set를 반환
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      {/* <AddCalculator /> */}
      <header>React Todo</header>
      <TodoGrid>
        <TodoHeader
          count={todoCount}
          onAllDoneChange={isAllDoneChangeHandler}
        />
        <TodoList>
          {cachedData.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDoneChange={onDoneChangeHandler}
            />
            // <TodoItemForChildren>
            //   <input id={todo.id} type="checkbox" />
            //   <label htmlFor={todo.id}>{todo.todo}</label>
            //   <span className="due-date">{todo.dueDate}</span>
            //   <span className="priority">{priorities[todo.priority]}</span>
            // </TodoItemForChildren>
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender onSaveButtonClick={onSaveButtonClickHandler} />
    </div>
  );
};

export default TodoMain;
