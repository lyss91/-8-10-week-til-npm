import { useState } from "react";
import { useReducer } from "react";

// 1. 초기 상태
const initialState = [];

// 2.  리듀서 함수

function reducer(state, action) {
  switch (action.type) {
    case "add":
      // 복잡한 작업
      console.log(action.payload);
      // 반드시 state 를 리턴한다.

      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];

    case "delete":
      // 복잡한 연산
      console.log(action.payload);
      // 반드시 state 리턴
      // id 랑 다른것만 리턴 ! ==
      return state.filter(item => item.id !== action.payload);

    case "toggle":
      //복잡한 연산
      // 반드시 state 를 리턴한다.
      return state.map(item =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item,
      );
  }
}
// 3. 리듀서 사용하는 컴포넌트
function Todo() {
  // 함수, 초기상태값
  // useReducer 에서는 dispatch 는 안바꾼다.
  const [todoState, dispatch] = useReducer(reducer, initialState);
  // 할일 state
  const [todo, setTodo] = useState();
  return (
    <div>
      <h1>Todo</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <button onClick={() => dispatch({ type: "add", payload: todo })}>
          등록
        </button>
      </div>
      <div>
        {todoState.map(item => (
          <div key={item.id}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
              onClick={() => dispatch({ type: "toggle", payload: item.id })}
            >
              {item.text}
            </span>
            <button
              onClick={() => {
                dispatch({ type: "delete", payload: item.id });
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Todo 예제</h1>
      <Todo />
    </div>
  );
}
export default App;
