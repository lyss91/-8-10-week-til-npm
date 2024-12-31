# Redux Toolkit (RTK)

- 전역 상태 (즉, Context) 를 관리하는 `상태관리도구`
  : Context API (리액트에 빌트인)
  : Redux, Redux Toolkit, Recoil, Zustands

## 관련 사이트

- https://redux.js.org/
- https://ko.redux.js.org/introduction/getting-started/

## 레퍼런스 사이트에서 RTK 를 추천함.

- `npm install @reduxjs/toolkit`
- `npm install redux`

## RTK 의 기본 예제 ( `순서를 준수` 하자)

- 학습순서는 `무조건 순서대` 로 하여야 함.
- 폴더구조, 파일명 등등...
- `/src/store 폴더` 생성 ( 전역 state 보관장소)
  : `store.js 파일` 생성

```js
// store 설정
// store 는 전역에서 사용할 state 를 말합니다.
// 회사에서는 /src/store 폴더를 주로 생성합니다.
// store 는 1개만 만들 수 있습니다.
// 즉, 전역 state 는 1개만 만들 수 있습니다.

import { configureStore } from "@reduxjs/toolkit";

// 파일명은 주로 store.js 라고 칭합니다.
const store = configureStore({
  reducer: {
    // store 를 쪼개서 즉, slice 해서 사용합니다.
  },
});
```

- `/src/features/counter 폴더` 생성
  : `counterSlice.js`
