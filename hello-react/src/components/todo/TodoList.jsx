import TodoItem, { TodoItemForChildren } from "./TodoItem";

const TodoList = ({ todoData, onDoneChange }) => {
  const priorities = ["없음", "높음", "보통", "낮음"];

  // todoData가 없다면 데이터가 없다.
  // react는 반환하는 tag가 하나여야 한다.
  return (
    <>
      {todoData.map((todo) => (
        <TodoItem
          priorities={priorities}
          todo={todo}
          onDoneChange={onDoneChange}
        />
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
