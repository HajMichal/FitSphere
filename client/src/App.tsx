import { Route, Routes } from "react-router";
import TestRoute from "./pages/TestRoute";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import CreateTrainng from "./pages/CreateTraining";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestRoute />} />
      <Route path="/home" element={<Home />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/create/training" element={<CreateTrainng />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Register />} />
    </Routes>
  );
}
