// ecma function (fat arrow function)
// const : 상수를 정의하는 키워드
// (parameter) => {function body} : fat arrow function
// const abc = () => {}; // 함수를 만들어서 상수에 넣어라

import { useEffect } from "react";
import { StateTest } from "./StateTest";
import TodoAppender from "./TodoAppender";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import TodoGrid from "./TodoGrid";
import AddCalculator from "./AddCalculator";
import { fetchTodoList } from "../../http/todo/fetchTodo";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

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

  // const [cachedData, setCachedData] = useState([]);
  // ReactRedux Store에서 todo state를 가져온다
  const { list: todoList } = useSelector((store) => store.todo);
  console.log("TodoList State", todoList);
  const storeDispatcher = useDispatch();

  const refreshTodoList = async () => {
    const fetchResult = await fetchTodoList();

    // setCachedData(todoList.body);
    // reducer 호출. reducer에 action에 할당.
    storeDispatcher(todoAction.refresh(fetchResult.body));

    if (fetchResult.errors) {
      alert(fetchResult.errors);
    }
  };

  useEffect(() => {
    refreshTodoList();
  }, []);

  // 컴포넌트가 만들어줄 HTML Tag set를 반환
  return (
    <div className="wrapper">
      <header>React Todo</header>
      <TodoGrid>
        <TodoHeader />
        <TodoList>
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
            // <TodoItemForChildren>
            //   <input id={todo.id} type="checkbox" />
            //   <label htmlFor={todo.id}>{todo.todo}</label>
            //   <span className="due-date">{todo.dueDate}</span>
            //   <span className="priority">{priorities[todo.priority]}</span>
            // </TodoItemForChildren>
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender />
    </div>
  );
};

export default TodoMain;
