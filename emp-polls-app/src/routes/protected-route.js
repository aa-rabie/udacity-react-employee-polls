import { Navigate } from "react-router-dom";
import { selectAuthUser } from "../features/authUser/authUserSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const authedUser = useSelector(selectAuthUser);
  const isAllowed = authedUser !== null;
  //TODO: REMOVE
  console.log(`isAllowed : ${isAllowed}`);

  return <>{isAllowed ? children : <Navigate to={redirectPath} />}</>;
};

export default ProtectedRoute;
