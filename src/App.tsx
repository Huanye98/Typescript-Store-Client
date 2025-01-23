import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import Store from "./Pages/Store";
import About from "./Pages/About"
import Admin from "./Pages/Admin/Admin"
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp"
import Cart from "./Pages/User/Cart";
import Profile from "./Pages/User/Profile"
import Error400 from "./Pages/Error/400";
import PaymentSuccess from "./Components/PaymentSuccess";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/store/:productId" element={<ProductPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/error" element={<Error400/>} />
        <Route path="/payment-success" element={ <PaymentSuccess/> }/>

      </Routes>
    </>
  );
};

export default App;
