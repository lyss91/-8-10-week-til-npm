# 카카오 맵 적용

- 페이지 구성

```jsx
import React from "react";

function App() {
  return (
    <div>
      <h1>카카오 지도</h1>
      <div></div>
    </div>
  );
}

export default App;
```

## 1. 카카오 개발자 등록하기

- [카카오 개발자 사이트](https://developers.kakao.com/)

## 2. 애플리케이션 등록과정

- [새 애플리케이션 등록 ]
- https://velog.io/@tpgus758/React%EC%97%90%EC%84%9C-Kakao-map-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
- Vite : `http://localhost:5173`
- CRA : `http://localhost:3000`
- jskey : `  `
- `카카오 맵 활성화 버튼 클릭 필수`

## 3. 카카오 지도 가이드

- [지도가이드](https://apis.map.kakao.com/web/guide/)

## 4. 지도 적용하기 (가이드 따라하기)

### 4.1. index.html 수정하기

```html
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."
></script>
```

- 적용후

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>리액트 라이브러리</title>
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."
    ></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4.2. App.jsx 에 적용해 보기

```jsx
import { useEffect } from "react";

function App() {
  // 앱 실행 후 컴포넌트가  마운트 될때 js 를 실행한다.
  // html 완료가 되면 출력
  useEffect(() => {
    // 웹 브라우저에 등록된 kakao 객체를 활용함.
    const { kakao } = window;
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}
export default App;
```

## 5. 지도 적용하기 (React 에서 처리)

### 5.1. `.env` 파일에 API 키 보관하기

- 모든 API 키
  : 구글, 네이버, 카카오 관련 키들
  : Firebase, Suparbase 등등..

### 5.2. 개발환경에 따라서 `접두어` 가 달라 진다.

#### 5.2.1. 이름 접두어 규칙

- `npx create-react-app 프로젝트명`

: CRA로 만든 프로젝트는 접두어가 ` REACT_APP_`

- `npm create vite@latest 프로젝트명`

: Vite 로 프로젝트의 접두어는 `VITE_`

- 이름 접두어 규칙
  : `REACT_APP_`
  : `VITE_`

  : 예) 카카오 JS 키 (`REACT_APP_KKO_MAP_KEY`)

- 이름에 담길 값도 `=` 다음에 문자열로 작성
  : "" 는 생략하자.

### 5.2.2 index.html 수정 [ 1. REACT_APP_ ] [ 2. VITE_]

#### 1. `REACT_APP_` `npx create-react-app 프로젝트명`

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>리액트 라이브러리</title>
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%VITE_KAKAO_MAP_KEY%&autoload=false&libraries=services"
    ></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### 2. `VITE_` `npm create vite@latest 프로젝트명`

: Vite 로 프로젝트의 접두어는 `VITE_`
: 예) 카카오 JS 키 (`VITE_KKO_MAP_KEY`)
: 이름에 담길 값도 `=` 다음에 문자열로 작성
: "" 는 생략하자.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>리액트 라이브러리</title>
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%VITE_KKO_MAP_KEY%&autoload=false&libraries=services"
    ></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 5.3. `.gitignore` 에 반드시 명시한다.

```
# env
.env
```

- `환경 설정 파일은 수정이 되거나, 새로 작성이 되면` 반드시 `재실행`해야 함.

### 5.4. App.jsx 적용방법

#### 5.4.1. `npx create-react-app 프로젝트` 경우

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KKO_MAP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
      });
    };
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}
export default App;
```

#### 5.4.2. `npm create vite@latest 프로젝트명` 경우
