# Swiper 활용

## 1. 설치

- npm install swiper

## 2. 관련문서

- https://swiperjs.com/
- https://swiperjs.com/react
- https://swiperjs.com/demos (demos 를 주로 이용한다.)
- https://codesandbox.io/p/devbox/swiper-react-navigation-2k3jk3?file=%2Fsrc%2FApp.jsx
  ```
   네이게이션 navigation={true} modules={[Navigation]}
  ```

## 3. 예제

- App.jsx

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";
// css 와 모듈 확인
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

function App() {
  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>하나</SwiperSlide>
          <SwiperSlide>둘</SwiperSlide>
          <SwiperSlide>삼</SwiperSlide>
          <SwiperSlide>넷</SwiperSlide>
          <SwiperSlide>다섯</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default App;
```

- slide.css

```css
.visual-slide {
  position: relative;
  width: 80%;
  height: 400px;
  margin: 0 auto;
  background-color: antiquewhite;
}

.sw-visual {
  width: 70%;
  height: 70%;
}
```

App.jsx - loop 와 navigation 적용 예제

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";
// css 와 모듈 확인
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

function App() {
  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>하나</SwiperSlide>
          <SwiperSlide>둘</SwiperSlide>
          <SwiperSlide>삼</SwiperSlide>
          <SwiperSlide>넷</SwiperSlide>
          <SwiperSlide>다섯</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default App;
```

## 4.API 연동 Swiper 슬라이드 만들기

- App.jsx

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";
// css 와 모듈 확인
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

// 1. 외부 데이터
const slideData = [
  {
    title: "뉴진스 좋아요",
    pic: "https://i.namu.wiki/i/WGsJjdq_YZ55OqLwDcVy03tPUDeuy2bFGjbv7hGdqeTxhugt9oQVd9skQTplZArzk64Id35mmLbkbcMwWEo2-g.webp",
  },
  {
    title: "뉴진스 화이팅",
    pic: "https://file2.nocutnews.co.kr/newsroom/image/2023/01/21/202301210408091762_0.jpg",
  },
  {
    title: "뉴진스 힘내요",
    pic: "https://img.sbs.co.kr/newsnet/etv/upload/2023/08/28/30000871570_1280.jpg",
  },
];

function App() {
  //1. 외부 데이터 useState 지정하기
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...slideData]);
  }, []);

  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          {/* <SwiperSlide>하나</SwiperSlide>
          <SwiperSlide>둘</SwiperSlide>
          <SwiperSlide>삼</SwiperSlide>
          <SwiperSlide>넷</SwiperSlide>
          <SwiperSlide>다섯</SwiperSlide> */}
          {/* 1. 외부데이터 map 으로 적용 시키기 */}
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.pic} alt={item.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
```
