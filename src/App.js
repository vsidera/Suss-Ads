import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users"
import Home from "./pages/home/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
        <Routes>
          <Route path='/' exact element={<Login/>} />
          <Route path='home' element={<Home/>} />
          <Route path='users' element={<Users/>} />
          <Route path='admin' element={<Admin/>} />
        </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
