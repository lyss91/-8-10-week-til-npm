import React, { useState } from "react";

const AddTodo = React.memo(({ addTodo }) => {
  console.log("AddTodo 리렌더링");
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === "") return; // 빈 입력 방지
    addTodo(text);
    setText("");
  };

  return (
    <div>
      <h3>할일 추가</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
});
// eslint 설정을 통해 전체 코드에 적용 가능
//  "react/display-name": "off"
// AddTodo.displayName = "AddTodo";
export default AddTodo;
