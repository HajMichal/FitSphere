import { Route, Routes } from "react-router";
import TestRoute from "./pages/TestRoute";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import CreateTraining from "./pages/CreateTraining";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTrainingDay from "./pages/ModifyTraining";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestRoute />} />
      <Route path="/home" element={<Home />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/stworz/trening" element={<CreateTraining />} />
      <Route path="/edycja/dzienTreningowy" element={<CreateTrainingDay />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Register />} />
    </Routes>
  );
}
