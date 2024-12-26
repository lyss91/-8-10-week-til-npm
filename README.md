# useCallback

    - useCallback() : 함수를 리랜더링 시 다시 정의하지 않고 보관해둠

## 기본예제

- 1. App.jsx 클릭시 카운팅증가

```jsx
import { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  // 리랜더링 즉, state 가 바뀌면 함수도 다시 만들어짐.
  // 이를 다시 정의하지 않도록 useCallback 활용
  const add = useCallback(() => {
    // 함수의 기능
    setCount(prev => prev + 1);
  }, []);
  return (
    <div>
      <h1> 카운팅 : {count}</h1>
      <button onClick={add}>증가</button>
    </div>
  );
}

export default App;
```

## 응용예제 1

- `컴포넌트는 props 가 전달되면 리랜더링 한다.`
- `props 가 변화가 없으면 리렌더링 안한다.`

2. App.jsx ## 응용예제 1

```jsx
import { useState, useCallback } from "react";

function App() {
  // 숫자 state
  const [count, setCount] = useState(0);
  //  내용 state
  const [text, setText] = useState("");
  // 숫자 증가 함수를 메모해둠
  // 만약 count 가 변하면 리렌더링 됨.
  // 만약 text 가 변하면 리렌더링 됨.
  // useCallback 을 활용하지 않는다면?? text, count 가 변하면 함수가 다시 만들어짐.
  const add = useCallback(() => {
    console.log("함수가 다시 만들어질까?");
    setCount(prev => prev + 1);
  }, []);
  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <Child add={add} />
      <div>현재값 카운팅하기 : {count}</div>
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}

export default App;

function Child({ add }) {
  console.log("자식 컴포넌트 리랜더링");
  return (
    <div>
      자식 컴포넌트
      <button onClick={add}>증가</button>
    </div>
  );
}
```

## 응용예제 2

- 3. App.jsx ## 응용예제 2
- 의존성 배열의 이해

```jsx
import { useState, useCallback } from "react";

function App() {
  const [query, setQuery] = useState("");
  // query 가 변경이 된다면 그때 함수를 다시 정의하겠다.
  const handleSearch = useCallback(() => {
    console.log("query를 처리하는 새로운 함수 생성 ", query);
  }, [query]);

  return (
    <div>
      <h1>state 변경시 함수 재 실행</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
export default App;
```
