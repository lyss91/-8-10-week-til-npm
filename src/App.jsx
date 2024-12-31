import { TodoProvider } from "./contexts/todoProvider";
import TodoAdd from "./todo/TodoAdd";
import TodoList from "./todo/TodoList";

// 아래 Provide 에 의해서 state, disaptch 접근가능
function App() {
  return (
    <TodoProvider>
      <TodoAdd />
      <TodoList />
    </TodoProvider>
  );
}
export default App;
