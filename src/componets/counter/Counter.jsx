import { useContext } from "react";
import {
  CounterDispatchContext,
  CounterStateContext,
} from "../../contexts/counterContext";

function Counter() {
  // 앱 전체에 context state 용도
  const state = useContext(CounterStateContext);
  // 앱 전체 context dispatch 용도
  const dispatch = useContext(CounterDispatchContext);

  if (!state || !dispatch) {
    return <div>Provider가 설정되지 않았습니다.</div>;
  }

  return (
    <div>
      <h1>Counter : {state.count}</h1>
      <button onClick={() => dispatch({ type: "add" })}>증가</button>
      <button onClick={() => dispatch({ type: "minus" })}>감소</button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
    </div>
  );
}
export default Counter;
