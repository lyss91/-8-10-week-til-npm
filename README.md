# React.memo

    - 컴포넌트에 리랜더링을 조절해 주는 것.
    - 컴포넌트에 props 가 바뀌지 않는 한 리렌더링 안됨.
    - 성능을 상당히 올려줌.
    - 회사 프로덕트에서는 리렌더링 횟수를 줄이는게 실력
    - 메모제이션 방안(useMemo, useCallback, React.memo) 중 가장 추천

## 기본예제 1

- App.jsx

```jsx
import React, { useState, useCallback, useRef } from "react";

function App() {
  const totalRef = useRef(3); // 1씩 증가하면서 id 관리
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 공부하기", completed: false },
    { id: 2, text: "운동가기", completed: false },
  ]);
  // todo 관리 함수를 리랜더링시 재생성 하지 않도록 적용
  // 1. 의존성 배열을 이용해 볼까?
  // 2. 내부에서 처리해 볼까?
  const addTodo = useCallback(
    text => {
      const newId = totalRef.current++;
      setTodos([...todos, { id: newId, text: text, completed: false }]);
      // setTodos(prev => [...prev, { id: newId, text: text, completed: false }]);
    },
    [todos],
  );
  // completed 변경
  // 1. 의존성 배열을 이용해 볼까?
  // 2. 내부에서 처리해 볼까?
  const toggleTodo = useCallback(id => {
    // const arr = todos.map(item =>
    //   item.id === id ? { ...item, completed: !item.completed } : item,
    // );
    // setTodos(arr);
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }, []);
  const deleteTodo = useCallback(id => {
    const arr = todos.filter(item => item.id !== id);
    setTodos(arr);
  }, []);

  return (
    <div>
      <h1>Todo Service </h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
export default App;

function AddTodo({ addTodo }) {
  const [text, setText] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };
  return (
    <div>
      <h3>할일 추가 </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

const TodoList = React.memo(function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}) {
  console.log("TodoList 리랜더링");
  return (
    <div>
      <h3>할일 전체 목록 </h3>
      {todos.map(item => {
        return (
          <TodoItem
            key={item.id}
            todo={item}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
});

const TodoItem = React.memo(function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
}) {
  console.log("TodoItem 리랜더링 : ", todo.text);
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </div>
  );
});
```

## 리액트 프로젝트 메모제이션 (최적화) 해 보셧나요?

- 복잡한 배열요소에 대한 처리는 useMemo 를 활용하였고,
- 함수의 재 정의를 제어하기 위해 useCallback 을 활용하였으며,
- 리랜더링 횟수를 조절하기 위해 React.memo를 적용하였습니다.

## 추가 샘플1 (파일로 컴포넌트 제작시 처리)

- src\AddTodo.jsx

```jsx
import React, { useState } from "react";

const AddTodo = React.memo(({ addTodo }) => {
  console.log("AddTodo 리렌더링");
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === "") return; // 빈 입력 방지
    addTodo(text);
    setText("");
  };

  return (
    <div>
      <h3>할일 추가</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
});
// eslint 설정을 통해 전체 코드에 적용 가능
//  "react/display-name": "off"
// AddTodo.displayName = "AddTodo";
export default AddTodo;
```

## 추가 샘플2 (파일로 컴포넌트 제작시 처리)

- src\TodoItem.jsx

```jsx
import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  console.log("TodoItem 리랜더링 : ", todo.text);
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </div>
  );
};

export default React.memo(TodoItem);
```
