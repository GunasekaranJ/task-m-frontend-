import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/Components/Login/Login";
import Register from "../src/Components/Register/Register";
import Todo from "./Components/Todo/Todo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
