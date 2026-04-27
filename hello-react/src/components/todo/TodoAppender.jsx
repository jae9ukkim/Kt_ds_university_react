import { useRef } from "react";
import { Alert } from "../ui/modals";

// 함수 props로 받아올 때는 handler 붙이지 않는 것이 관례
const TodoAppender = ({ onSaveButtonClick }) => {
  const refTask = useRef();
  const refDate = useRef();
  const refPriority = useRef();
  const todoAlertRef = useRef();

  const onSaveButtonClickHandler = () => {
    if (!refTask.current.value) {
      todoAlertRef.current.showModal("Input Task");
      return;
    }
    if (!refDate.current.value) {
      todoAlertRef.current.showModal("Input Date");
      return;
    }
    if (!refPriority.current.value) {
      todoAlertRef.current.showModal("Input Priority");
      return;
    }

    onSaveButtonClick(
      refTask.current.value,
      refDate.current.value,
      refPriority.current.value,
    );

    refTask.current.value = "";
    refDate.current.value = "";
    refPriority.current.value = "";
  };

  return (
    <footer>
      <Alert dialogRef={todoAlertRef} />
      <input type="text" placeholder="Input new task" ref={refTask} />
      <input type="date" ref={refDate} />
      <select ref={refPriority}>
        <option value="">우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onSaveButtonClickHandler}>
        Save
      </button>
    </footer>
  );
};

export default TodoAppender;
