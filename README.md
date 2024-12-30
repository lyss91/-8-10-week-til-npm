# useReducer

## 목적

: state 를 생성
: state 를 업데이트하는 기능을 별도로 관리
: state 를 업데이트하는 과정이 상당히 복잡한 경우 적합함.
: Redux, Recoil, Zustand 등이 state 관리의 기본 구성을 이해하는데 도움.

## useReducer 이해의 과정

: 간단한 state 관리
: 폴더 컨벤션을 생성후 관리
: Context API 와 useReducer 활용

## 기본 예제1

- App.jsx 기본 예제1

```jsx
import { useReducer } from "react";

//  1. 초기 상태
const initialState = { count: 0 };
//  2. 리듀서 함수 ( 상태를 변경하는 기능, 형식 반드시 유지 권유)
// state 는 초기상태값, 즉 원본을 말합니다. ( 별도로 업데이트 하지 않습니다. )
// action 에 여러가지 옵션을 주어서 state 를 업데이트 한다.
function reducer(state, action) {
  // console.log("state", state);
  // console.log("action : ", action);
  switch (action.type) {
    case "add":
      // 처리하고 나서
      // 항상 state 를 리턴해준다.
      return { count: state.count + 1 };
    case "minus":
      // 처리하고 나서
      // 항상 state 를 리턴해준다.
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  // 3. useReduce 에 state 와 디스패치 함수 등록
  // 첫번째 매개변수 : 리듀서 함수
  // 두번째 매개변수 : 초기 state
  // 리턴값 : state 는 리랜더링시 표현
  // 리턴값 : dispatch 는 리듀서 함수실행을 전파함.
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>결과값: {state.count}</p>
      <button onClick={() => dispatch({ type: "add" })}>더하기</button>
      <button onClick={() => dispatch({ type: "minus" })}>빼기</button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
      <button onClick={() => dispatch({ type: "gogo" })}>테스트</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>useReducer 활용</h1>
      <Counter />
    </div>
  );
}

export default App;
```

## 기본 예제2

- App.jsx 기본 예제2

```jsx
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
```

## 소규모 프로젝트

- /src/components/counter 폴더 생성
- /src/components/counter/Counter.jsx 파일 생성

```jsx
import { useReducer } from "react";
import { counteReducer, countInitialState } from "./CounterReducer";

function Counter() {
  const [countState, dispatch] = useReducer(counteReducer, countInitialState);
  return (
    <div>
      <h1>Counter : {countState.count}</h1>
      <button onClick={() => dispatch({ type: "add" })}>증가</button>
      <button onClick={() => dispatch({ type: "minus" })}>감소</button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
    </div>
  );
}
export default Counter;
```

- /src/components/counter/`CounterReducer.js` 파일 생성

```js
// 1.
export const countInitialState = { count: 0 };
// 2.
export function counteReducer(state, action) {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}
```

## 중규모 프로젝트

- /src/componets/counter/Counter.jsx : UI

```jsx
import { useReducer } from "react";
import {
  counteReducer,
  countInitialState,
} from "../../store/reducers/countReducer";

function Counter() {
  const [countState, dispatch] = useReducer(counteReducer, countInitialState);
  return (
    <div>
      <h1>Counter : {countState.count}</h1>
      <button onClick={() => dispatch({ type: "add" })}>증가</button>
      <button onClick={() => dispatch({ type: "minus" })}>감소</button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
    </div>
  );
}

export default Counter;
```

- /src/store 폴더생성
- /src/store/reducers 폴더생성
  : countReducer.js 파일 생성

  ```js
  // Reducer 함수
  export function countReducer(state, action) {
    switch (action.type) {
      case "add":
        return { count: state.count + 1 };
      case "minus":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
      default:
        return state;
    }
  }
  ```

- /src/store/initialStates 폴더생성
  : countInitialState.js 파일 생성

  ```js
  // 초기 state
  export const countInitialState = { count: 0 };
  ```

## 대규모 프로젝트 (모듈기반)

- /src/modules 폴더 생성

- /src/modules/counter 폴더 생성
  : countInitialState.js 파일생성

```js
// 초기 state
export const countInitialState = { count: 0 };
```

: countTypes.js 파일생성

```js
// Action의 type 의 상수화
//  상태를 업데이트 할 때 무엇, 무엇, 무엇이 필요한지 검토하는 과정추출
export const ADD = "add";
export const MINUS = "minus";
export const RESET = "reset";
```

: countReducer.js 파일생성

```js
import { ADD, MINUS, RESET } from "./countTypes";

// Reducer 함수
export function countReducer(state, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    case MINUS:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}
```

: countAction.js 파일생성

```js
import { ADD, MINUS, RESET } from "./countTypes";

//  action 은 상태를 업데이트한 과정
export const add = () => ({ type: ADD });
export const minus = () => ({ type: MINUS });
export const reset = () => ({ type: RESET });
```

- /src/components/Counter.jsx :UI

```jsx
import { useReducer } from "react";
import { countReducer } from "../../modules/counter/countReducer";
import { countInitialState } from "../../modules/counter/countInitialState";
import { add, minus, reset } from "../../modules/counter/countAction";
function Counter() {
  const [countState, dispatch] = useReducer(countReducer, countInitialState);
  return (
    <div>
      <h1>Counter : {countState.count}</h1>
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>초기화</button>
    </div>
  );
}

export default Counter;
```

- /src/modules/todos 폴더 생성 (12/31 예정)
