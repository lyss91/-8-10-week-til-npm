# useRef

- `리랜더링 하여도 값을 보관`한다.
- 화면 출력 용도는 아님
- 용도
  : html 태그 참조
  : 변수값 참조

## DOM 요소 접근

- App.jsx

```jsx
import { useRef } from "react";

function App() {
  // 태그참조
  const inputRef = useRef(null);

  const handleFocus = () => {
    // current 를 통해서 태그 참조
    inputRef.current.focus();
  };
  return (
    <div>
      <h1>포커스이동</h1>
      {/* ref 로 연결한다. */}
      <input ref={inputRef} placeholder="아이디 입력" />
      <button onClick={() => handleFocus()}>입력창 이동</button>
    </div>
  );
}
export default App;
```

### 값 접근 및 저장

- 리랜더링 시에도 값을 보관한다.

```jsx
import { useRef } from "react";

function App() {
  const countRef = useRef(0);
  const incre = () => {
    countRef.current++;
    console.log(countRef.current);
  };
  return (
    <div>
      <h1>값 보관 및 저장 {countRef.current}</h1>
      <button onClick={incre}>증가</button>
    </div>
  );
}
export default App;
```

## 응용예제1 (태그위치로 이동하기)

```jsx
import { useRef } from "react";

function App() {
  const compRef = useRef(null);
  const topRef = useRef(null);

  const moveCom = () => {
    console.log("회사소개로 이동");
    compRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const topMove = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div ref={topRef}>
      <h1>스크롤 해보기</h1>
      <button onClick={moveCom}>회사소개</button>
      <div style={{ height: "100vh", backgroundColor: "hotpink" }}>인사말</div>
      <div
        ref={compRef}
        style={{ height: "100vh", backgroundColor: "greenyellow" }}
      >
        회사소개
      </div>

      <button
        onClick={topMove}
        style={{ position: "fixed", right: 0, bottom: 0 }}
      >
        위로가기
      </button>
    </div>
  );
}
export default App;
```

## 응용예제2 (폼 값 초기화)

```jsx
import { useRef } from "react";

function App() {
  const inputRef = useRef(null);
  const clear = () => {
    // 폼값 초기화
    inputRef.current.value = "";
  };
  return (
    <div>
      <input ref={inputRef} placeholder="이름" />
      <button onClick={clear}>값 초기화</button>
    </div>
  );
}

export default App;
```

## 응용예제3 (비디오 제어)

```jsx
import { useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const prevV = () => {
    videoRef.current.currentTime -= 10;
    videoRef.current.play();
  };
  const playV = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  const stopV = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
  };
  const nextV = () => {
    videoRef.current.currentTime += 10;
    videoRef.current.play();
  };
  return (
    <div>
      <h1>VIDEO 제어</h1>
      {/* <video src="비디오주소url"></video> */}
      <video ref={videoRef} src="비디오주소url" muted autoPlay controls></video>
      <div>
        <button onClick={prevV}>10초전</button>
        <button onClick={playV}>play</button>
        <button onClick={stopV}>stop</button>
        <button onClick={nextV}>10초후</button>
      </div>
    </div>
  );
}
export default App;
```
