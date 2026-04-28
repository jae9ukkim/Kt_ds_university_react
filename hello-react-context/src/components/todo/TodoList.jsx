import { useContext } from "react";
import TodoItem, { TodoItemForChildren } from "./TodoItem";
import { TodoContext } from "./contexts/TodoContext";

const TodoList = () => {
  const priorities = ["없음", "높음", "보통", "낮음"];

  const { todos } = useContext(TodoContext);

  // todoData가 없다면 데이터가 없다.
  // react는 반환하는 tag가 하나여야 한다.
  return (
    <>
      {todos.map(({ id }) => (
        // todo 전체를 가져오지 않고 객체분해해서 필요한 id만 가져온다
        <TodoItem key={id} id={id} priorities={priorities} />
        // <TodoItemForChildren>
        //   <input id={todo.id} type="checkbox" />
        //   <label htmlFor={todo.id}>{todo.todo}</label>
        //   <span className="due-date">{todo.dueDate}</span>
        //   <span className="priority">{priorities[todo.priority]}</span>
        // </TodoItemForChildren>
      ))}
    </>
  );
};

export default TodoList;
