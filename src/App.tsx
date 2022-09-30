import { Routes, Route } from "react-router-dom";
import Nav from "./Layout/Nav";
import Home from "./pages/home/Home";
import Shorten from "./pages/home/Shorten";
import ChangePassword from "./pages/login/ChangePassword";
import FindPassword from "./pages/login/FindPassword";
import FindPasswordSuccess from "./pages/login/FindPasswordSuccess";
import Login from "./pages/login/Login";
import Regist from "./pages/login/Regist";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/findpassword/success" element={<FindPasswordSuccess />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Shorten />} />
        </Route>
      </Route>
    </Routes>
  );
}
