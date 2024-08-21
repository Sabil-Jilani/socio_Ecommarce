import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.userCredentials.user);
  // console.log(user);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
