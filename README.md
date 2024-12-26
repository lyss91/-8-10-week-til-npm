# useMemo

- 흔히 `React 를 최적화` 하였습니다.

## 레이아웃 최적화 했어요?

- `Shift Layout` 해결 안되었네요. 의미함.
- css 로 직접 만들거나 npm 을 이용하여 해결

## 리랜더링 최적화 했어요?

- useMemo() : 변수 관리 했어요?
- useCallback() : 함수 관리 했어요?
- React.memo() : 컴포넌트 관리 했어요?

## Lazy Loading 했어요?

## 이미지 최적화 했어요?

## SEO 최적화 했어요?

## GA4 적용 했어요?

## useMemo

- 값을 연산한 결과 보관시 활용
- 배열의 복잡한 연산시 결과 보관시 활용
- 변수를 보관한다.
- 값, 또는 복잡한 계산의 결과를 재활용할 때
- 같은 값을 계속해서 리랜더링 시 `계산하지 않도록 보관함`.
- `가능하면 ***많이*** 활용하지 마세요`. 오히려 부하가 발생해서 성능이 느려집니다.

### 기본 이해

    - 아래 코드는 숫자를 변경하면 다시 계산한다.
    - 아래 코드는 글자를 변경하면 다시 number 를 계산한다.
    - 즉, 매번 다시 계산한다. (성능상 이유없이 다시 계산하는 문제)

- 기본 형태
- 1. App.jsx

```jsx
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");
  const resultFn = () => {
    return number * number;
  };

  return (
    <div>
      <h1>간단한 계산 출력</h1>
      <div>
        <input
          type="number"
          placeholder="숫자입력"
          value={number}
          onChange={e => setNumber(parseInt(e.target.value))}
        />
        <p>값 : {resultFn}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="글자입력"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <p>글자 : {text} </p>
      </div>
    </div>
  );
}

export default App;
```

- useMemo 를 이용한 연산을 조건을 걸어두고 진행하도록 변경
- 불필요한 연산을 배제해서 성능을 올려줌.

2. App.jsx 간단한 계산 출력

```jsx
import { useMemo, useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");

  // 값을 메모해두고 해당하는 state 만 변경되면 그때 업데이트 하라.
  // 값을 보관하고 리랜더링이 일어나도 다시 값을 계산하는 과정을 생략함.
  const resultFn = useMemo(() => {
    console.log("값을 다시 계산하라 : ", number);
    return number * number;
  }, [number]); // 여기에서 [number]는 의존성 배열이라고 합니다.
  // number라는 값이 바뀌면 다시 연산을 하여라.
  // 그 외에는 예전 값을 사용하라는 의미
  return (
    <div>
      <h1>간단한 계산 출력</h1>
      <div>
        <input
          type="number"
          placeholder="숫자입력"
          value={number}
          // 숫자를 입력할 때 값 변경 : number 값 업데이트
          onChange={e => setNumber(parseInt(e.target.value))}
        />
        <p>값 : {resultFn}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="글자입력"
          value={text}
          // 글자를 입력할 때 값 number는 다시 변경되지 않기를 바람
          onChange={e => setText(e.target.value)}
        />
        <p>글자 : {text} </p>
      </div>
    </div>
  );
}

export default App;
```

### 활용 예제

- 단순 연산 외에 배열 처리시 활용
- 배열이 엄청 길때, 배열을 다루는 연산이 복잡하면 실행이 느려집니다.
- 배열이 변경이 될 때만 연산 하도록 useMemo 활용.

- 3. App.jsx filter 배열 다루기(e 누르면 e 포함된 애들이 출력됨)

```jsx
import React, { useMemo, useState } from "react";

function App() {
  // 검색어
  const [query, setQuery] = useState("");
  // 검색할 배열요소들 : 실제로는 많은 요소가 있다고 가정.
  const items = ["apple", "banana", "cherry", "date", "elderberry"];

  // query나 items가 변경될 때만 필터링
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    // filter 는 참인 것만 배열로 모아서 리턴
    // includes 는 글자가 있는지 검사
    return items.filter(item => item.includes(query));
  }, [query, items]);
  // query 즉 검색어와, items 배열 에 변화가 일어나면 그때만 계산을 다시하라.

  return (
    <div>
      <h1>Filtered List</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search items"
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

- 4. App.jsx sort() 함수 오르내림 차순 정렬하기

```jsx
import { useMemo } from "react";
import { useState } from "react";

function App() {
  // 데이터를 정렬한다.
  const [sortBy, setSortBy] = useState("name");
  //  백엔드에서 받은 회원 목록 데모 데이터
  const data = [
    { id: 1, name: "Bbc", age: 40 },
    { id: 2, name: "Abc", age: 25 },
    { id: 3, name: "Ccc", age: 35 },
  ];
  // 복잡한 연산을 매번 실행하지 않고, sortBy가 바뀐 경우만 정렬하고 싶다.
  const sortData = useMemo(() => {
    console.log("정렬함", sortBy);
    // 아래 sort 구문은 조건에 따라서 true, false 를 반복하면 순서배치 진행
    // a[sortBy] 는                 a["name"] > b["name"]
    return [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }, [sortBy]);

  console.log(sortData);
  return (
    <div>
      <h1>배열의 속성을 이용한 정렬</h1>
      <div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value={"id"}>ID</option>
          <option value={"name"}>Name</option>
          <option value={"age"}>Age</option>
        </select>
      </div>
      {/* 표 */}
      <table border={1}>
        {/* 테이블 헤더 */}
        <thead>
          {/* 테이블 row */}
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        {/* 테이블 몸체 */}
        <tbody>
          {sortData.map(item => {
            return (
              <tr key={item.id}>
                <tdata>{item.name}</tdata>
                <tdata>{item.age}</tdata>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
```
