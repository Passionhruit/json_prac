import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // 유저 불러오기
    const getUsers = async () => {
      const response = await axios.get(`http://localhost:4000/users`);
      setUsers(response.data);
    };

    getUsers();
  }, []);

  // 유저 수정하기

  const updateUser = async (id, body) => {
    console.log(id, body);
    await axios.patch(`http://localhost:4000/users/${id}`, body);
    window.location.reload();
  };

  return (
    <div>
      {users.map((user) => (
        <>
          <div>고유번호 : {user.id}</div>
          <div>이름 : {user.name}</div>
          <div>이메일 : {user.email}</div>
        </>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() =>
          updateUser(1, {
            id: 1,
            name: input,
            email: "John@gmail.com",
          })
        }
      >
        유저 이름 변경하기
      </button>
    </div>
  );
}

export default App;
