// 로그인에 관련된 코드를 모아둔다.
// 더불어서, 컴포넌트는 아니지만, use 훅들을 사용했다.
// 일반 함수에는 use 훅들을 사용못한다.
// 그래? 그러면 custom hook 만들어서 활용한다.

import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);
  // 사용자 정보
  const [data, setData] = useState(null);
  // 서버 에러
  const [error, setError] = useState(null);
  // 서버 연결중
  const [loading, setIsLoading] = useState(false);
  // 로그인 함수
  const login = async (id, pw) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/login", { id: id, pw: pw });
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { data, loading, error, isLogin, login };
};
