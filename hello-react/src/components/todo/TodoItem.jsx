import { useContext, useRef } from "react";
import { Confirm } from "../ui/modals";
import TodoContext from "./contexts/TodoContext";
import { fetchDoneTodo, fetchTodoList } from "../../http/todo/fetchTodo";
import { useDispatch } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

const TodoItem = ({ todo }) => {
  console.log("TodoItem");
  const priorities = ["없음", "높음", "보통", "낮음"];
  const confirmRef = useRef();
  const checkboxRef = useRef();

  const reactReduxDispatcher = useDispatch();

  const { componentName } = useContext(TodoContext);
  console.log("TodoItem: " + componentName);
  if (!componentName || componentName !== "TodoList") {
    return <></>;
  }
  // props todo의 이름과 todo.todo의 이름이 같아 객체 구조 분해 불가.
  // todo.todo의 이름을 todoTask로 변경해 할당.
  const { id, task: todoTask, dueDate, priority } = todo;

  const doneClass = todo.done ? "done" : "";

  const onDoneChangeHandler = () => {
    if (checkboxRef.current.checked) {
      confirmRef.current.showConfirm(`${todoTask}을 완료 하시겠습니까?`);
    } else {
      confirmRef.current.showConfirm(`${todoTask}을 미완료 하시겠습니까?`);
    }
  };

  const onOkClickHandler = async () => {
    reactReduxDispatcher(todoAction.doneItem(id));
    const doneResult = await fetchDoneTodo(id);
    if (doneResult.errors) {
      alert(doneResult.errors);
    }

    const fetchResult = await fetchTodoList();
    reactReduxDispatcher(todoAction.refresh(fetchResult.body));
  };
  const onCloseClickHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <li className="tasks-item">
      <Confirm
        dialogRef={confirmRef}
        onOkClick={onOkClickHandler}
        onCloseClick={onCloseClickHandler}
      />
      <input
        id={id}
        type="checkbox"
        checked={todo.done}
        ref={checkboxRef}
        onChange={onDoneChangeHandler}
      />
      <label className={doneClass} htmlFor={id}>
        {todoTask}
      </label>
      <span className={`due-date ${doneClass}`}>{dueDate}</span>
      <span className={`priority ${doneClass}`}>{priorities[priority]}</span>
    </li>
  );
};
export default TodoItem;

export const TodoItemForChildren = ({ children }) => {
  return <li className="tasks-item">{children}</li>;
};
