import { memo, useRef, useState } from "react";
import { Alert } from "../ui/modals";
import { fetchAddTodo, fetchTodoList } from "../../http/todo/fetchTodo";
import { useDispatch } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

// 함수 props로 받아올 때는 handler 붙이지 않는 것이 관례
const TodoAppender = memo(() => {
  console.log("TodoAppender");

  const [isFetching, setIsFetching] = useState(false);

  const refTask = useRef();
  const refDate = useRef();
  const refPriority = useRef();
  const todoAlertRef = useRef();

  const reactReduxDispatcher = useDispatch();

  const onSaveButtonClickHandler = async () => {
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

    setIsFetching(true);

    const addResult = await fetchAddTodo(
      refTask.current.value,
      refDate.current.value,
      refPriority.current.value,
    );

    setIsFetching(false);

    if (addResult.errors) {
      alert(addResult.errors);
    }

    const fetchResult = await fetchTodoList();
    reactReduxDispatcher(todoAction.refresh(fetchResult.body));

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
      <button
        type="button"
        disabled={isFetching}
        onClick={onSaveButtonClickHandler}
      >
        {isFetching ? "저장중..." : "저장"}
      </button>
    </footer>
  );
});

export default TodoAppender;
