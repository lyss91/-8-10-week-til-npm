import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCount";
import { useAxios } from "./hooks/useAxios";
import { useLogin } from "./hooks/useLogin";

function App() {
  // 커스텀 훅 사용법
  const { count, add, minus } = useCount(100);
  const { data, error, loading } = useAxios();
  const { data, loading, error, isLogin, login } = useLogin();
  const windowSize = useComponent();

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={add}>증가</button>
      <button onClick={minus}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
}

export default App;
