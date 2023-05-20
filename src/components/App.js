import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import NoteState from "../contexts/notes/NoteState";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <NoteState>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </NoteState>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
