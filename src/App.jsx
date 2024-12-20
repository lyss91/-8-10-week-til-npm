import { FaStar } from "react-icons/fa6";
function App() {
  const point = 5; // 총 별점
  const rate = 3; // 별점
  return (
    <>
      <div>
        <FaStar style={{ color: "red", fontSize: 50 }} />
        App
      </div>
      <h1>당신의 별점은 </h1>
      <div>
        {/* {[1, 2, 3, 4, 5].map((item, index) => { */}
        {[...Array(point)].map((item, index) => {
          // point 숫자 만큼 배열을 나누어서 출력한다. 5개면 5개. 10개 등등
          return (
            <FaStar
              key={index}
              style={{ color: index < rate ? "gold" : "gray" }}
            />
          );
        })}
      </div>
    </>
  );
}
export default App;
