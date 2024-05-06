import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import SignUp from "./pages/Register/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import PrivateEmployeManger from "./components/PrivateEmployeManger";
import ViewEmploye from "./pages/ViewEmployee/ViewEmploye";
import UdpdateEmloye from "./pages/UpdateEmployee/updateEmploye";
import Attend from "./pages/Attend/Attend";
import Absent from "./pages/LeaveManage/Absent";
import Emp from "./pages/Employee/Employee";
import View from "./pages/EmployeAbsview/EmployeAbsview";
import Dash from "./components/DashProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/attend" element={<Attend />} />

        <Route element={<PrivateRoute />}>
        <Route path="/emp" element={<Emp />} />
        <Route path="/empview" element={<View />} />
         
        </Route>

        <Route element={<PrivateEmployeManger  />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/view" element={<ViewEmploye />} />
          <Route path="/update-emp/:EploId" element={<UdpdateEmloye />} />
          <Route path="/absent" element={<Absent />} />
          <Route path="/profile" element={<Dash />} />
          
          
           </Route>
      </Routes>


      <Footer />
    </BrowserRouter>
  );
}
