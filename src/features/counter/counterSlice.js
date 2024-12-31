const initialState = {
  count: 0,
};
// 코딩 컨벤션
// Slice 는 store 를 쪼개서 사용한다는 의미
const counterSlice = createSlice({
  // 슬라이스 구분 이름
  naem: " counterSlice",
  // 슬라이스 초기 값
  initialState: initialState,
  // store/counterslice 에 저장된 값 갱신 함수
  reducers: {
    add: state => {
      state.count += 1;
    },
    minus: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 1;
    },
  },
});

const todoSlice = createSlice();
const loginSlice = createSlice();

export const { add, minus, reset } = counterSlice.actions;
export default counterSlice.actions;
