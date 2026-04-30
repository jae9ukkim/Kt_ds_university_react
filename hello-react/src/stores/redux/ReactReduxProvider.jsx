// React-Redux Reducer 생성

import { Provider } from "react-redux";
import { createStore } from "redux";

/**
 *
 * @param {*} store React-Redux가 관리하는 state 저장소
 * @param {*} action store의 state를 변경할 객체(type, action)
 */
const reactReduxReducer = (
  store = {
    todo: [],
    article: [],
    token: null,
  },
  action,
) => {
  console.log(action);

  const { type, payload } = action;
  if (type === "todo-refresh") {
    // memory를 바꿔주기 위해 ...
    return { ...store, todo: payload };
  } else if (type === "todo-all-done") {
    // return {
    //   ...store,
    //   todo: store.map((eachTodo) => {
    //     eachTodo.done = true;
    //     return eachTodo;
    //   }),
    // };
    return {
      ...store,
      todo: store.todo.map((eachTodo) => ({ ...eachTodo, done: true })),
    };
  } else if (type === "todo-done-item") {
    return {
      ...store,
      todo: store.todo.map((eachTodo) => {
        if (eachTodo.id === payload) {
          eachTodo.done = true;
        }
        return eachTodo;
      }),
    };
  }

  return store;
};

// React-Redux-Store 생성
const createReactReduxStore = () => {
  return createStore(reactReduxReducer);
};

// React-Redux-Provider 생성
export const ReactReduxProvider = ({ children }) => {
  const store = createReactReduxStore();
  // store의 결과를 provide
  return <Provider store={store}>{children}</Provider>;
};
