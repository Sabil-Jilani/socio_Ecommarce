import { createContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAutoLogInMutation } from "./api_slices/authApiSlice";
import { logout } from "./api_slices/authSlices";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import LogIn from "./component/logIn";
import { initialState, reducer } from "./reducer";
import ForgetScreen from "./screens/ForgetScreen";
import HomeScreen from "./screens/HomeScreen";
import PostsScreen from "./screens/PostsScreen";
import ProdcutScreen from "./screens/ProdcutScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { default as ProfilesScreen } from "./screens/ProfilesScreen";
import AdminOrdersScreen from "./screens/adminScreens/AdminOrdersScreen";
import AdminProductsScreen from "./screens/adminScreens/AdminProductsScreen";
import AdminUsersScreen from "./screens/adminScreens/AdminUsersScreen";
import AdminEditProductScreen from "./screens/adminScreens/adminEditProductsScreen";
import AdminPrivateScreen from "./screens/adminScreens/adminPrivateScreen";
import CartScreen from "./screens/cartScreen";
import ChangePassScreen from "./screens/changePassScreen";
import ProfileDashBoard from "./screens/privateScreens//ProfileDashBoardScreen";
import OrderDetail from "./screens/privateScreens/OrderDetail";
import PaymentScreen from "./screens/privateScreens/PaymentScreen";
import PlaceOrderScreen from "./screens/privateScreens/placeOrderScreen";
import PrivateRoute from "./screens/privateScreens/privateRoute";
import Shipping from "./screens/privateScreens/shippingScreen";
import VarifyScreen from "./screens/varifyScreen";
import "./styles/App.css";
export const globalContext = createContext();

function App() {
  const Dispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoggedIn] = useAutoLogInMutation();
  useEffect(() => {
    async function fetch() {
      try {
        await isLoggedIn().unwrap();
      } catch (error) {
        Dispatch(logout());
      }
    }
    fetch();
  }, []);

  const Root = () => {
    // creating the layout
    return (
      <>
        <header>
          <Navbar />
          <ToastContainer autoClose={4000} />
          {state.logIn && <LogIn />}
          {state.register && <Register />}
        </header>
        <main>
          {/* adding all the routes in createRouterFromlements() */}
          <Outlet />
        </main>
        <Footer></Footer>
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      // route is providing the layouts...................
      <Route path="/" element={<Root />}>
        <Route index element={<HomeScreen />} />
        <Route path="product/:id" element={<ProdcutScreen />} />
        <Route path="profile/:id" element={<ProfileScreen />} />
        <Route element={<AdminPrivateScreen />}>
          <Route path="products" element={<AdminProductsScreen />} />
          <Route path="editProduct/:id" element={<AdminEditProductScreen />} />
          <Route path="orders" element={<AdminOrdersScreen />} />
          <Route path="users" element={<AdminUsersScreen />} />
        </Route>
        <Route path="user/:userId/token/:token" element={<VarifyScreen />} />
        <Route path="/:userId/forget/:token" element={<ChangePassScreen />} />
        <Route path="forget" element={<ForgetScreen />} />
        <Route element={<PrivateRoute />}>
          <Route path="order/:status/:id" element={<OrderDetail />} />
          <Route path="payment" element={<PaymentScreen />} />
          <Route path="profile" element={<ProfileDashBoard />} />
          <Route path="orderDetail/:id" element={<OrderDetail />} />
          <Route path="placeOrder" element={<PlaceOrderScreen />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>
        <Route path="cart" element={<CartScreen />} />
        <Route path="profiles" element={<ProfilesScreen />} />
        <Route path="posts" element={<PostsScreen />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <globalContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router} />
      </globalContext.Provider>
    </div>
  );
}

export default App;
