import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users"
import Home from "./pages/home/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Contacts from "./pages/contacts/Contacts";
import Messages from "./pages/messages/Messages";
import AppServices from "./pages/app_services/app_services";
import Applications from "./pages/applications/Applications";

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
        <Routes>
          <Route path='/login' exact element={<Login/>} />
          <Route path='home' element={<Home/>} />
          <Route path='users' element={<Users/>} />
          <Route path='admin' element={<Admin/>} />
          <Route path='contacts' element={<Contacts/>} />
          <Route path='messages' element={<Messages/>} />
          <Route path='appservices' element={<AppServices/>} />
          <Route path='apps' element={<Applications/>} />
        </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
