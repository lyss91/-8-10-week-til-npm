// 일반적으로 FE 개발자는 백엔드와 API 통신을 할거다.
// 일반적으로 FE 개발자는 주소와 자료를 전달하고 결과를 받을 것이다.
// 일반적으로 FE 개발자는 get, post, put, delete 를 사용할 것이다.
// 내가 API 통신을 편리하게 사용할 수 있는 Hook 을 만들어서
// 팀의 API 통신 컨벤션을 제공하겠다.

import axios from "axios";
import { useState, useEffect } from "react";

// 일반적 사용을 조사
// const { data, error, loading } = useAxios("주소", "자료", "get");
// const { data, error, loading } = useAxios("주소", "자료", "GET");
// const { data, error, loading } = useAxios("주소", { 자료 }, "post");
// const { data, error, loading } = useAxios("주소", null, "put");
// const { data, error, loading } = useAxios("주소", 1, "delete");
export function useAxios(_url, _payload = null, _method) {
  // api 회신 결과
  const [data, setData] = useState(null);
  // api 회산 오류 결과
  const [error, setError] = useState(null);
  // api 호출 진행 중
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 로딩 진행중
    setLoading(true);
    // API 연동 실행
    const fetchAPI = async () => {
      try {
        let response;
        // 대문자로 _method 통일함.
        let method = _method.toUppercase(_method);
        switch (method) {
          case "GET":
            // axios.get("주소?id=1&num=2&cate=과일")
            response = await axios.get(_url);
            break;
          case "POST":
            // axios.post("주소", {객체} )
            response = await axios.post("주소", _payload);
            break;
          case "PUT":
            // axios.put("주소", {객체} )
            response = await axios.put(_url, _payload);
            break;
          case "DELETE":
            // axios.delete("주소?id=5" )
            response = await axios.delete(_url);
            break;
          default:
            throw new Error(`${_method} 잘못 보내셨네요.`);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    // 만들어둔 fetch 실행
    fetchAPI();
    // 로딩 완료
    setLoading(false);
  }, [_url, _payload, _method]);

  return { data, error, loading };
}
