import { useRef } from "react";
import { Confirm } from "../ui/modals";

const TodoItem = ({ todo, priorities, onDoneChange }) => {
  // props todo의 이름과 todo.todo의 이름이 같아 객체 구조 분해 불가.
  // todo.todo의 이름을 todoTask로 변경해 할당.
  const { id, todo: todoTask, dueDate, priority } = todo;
  const confirmRef = useRef();
  const checkboxRef = useRef();

  const doneClass = todo.isDone ? "done" : "";

  const onDoneChangeHandler = () => {
    if (checkboxRef.current.checked) {
      confirmRef.current.showConfirm(`${todoTask}을 완료 하시겠습니까?`);
    } else {
      confirmRef.current.showConfirm(`${todoTask}을 미완료 하시겠습니까?`);
    }
  };

  const onOkClickHandler = () => {
    onDoneChange(id, !todo.isDone);
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
        ref={checkboxRef}
        onChange={onDoneChangeHandler}
      />
      <label className={doneClass} htmlFor={id}>
        {todoTask}
      </label>
      <span className={`due-date ${doneClass}`}>{dueDate}</span>
      <span className={`priorit ${doneClass}`}>{priorities[priority]}</span>
    </li>
  );
};
export default TodoItem;

export const TodoItemForChildren = ({ children }) => {
  return <li className="tasks-item">{children}</li>;
};
