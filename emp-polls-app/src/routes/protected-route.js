import { useNavigate } from "react-router-dom";
import { selectAuthUser } from "../features/authUser/authUserSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const authedUser = useSelector(selectAuthUser);
  const navigate = useNavigate();
  useEffect(() => {
    const isAllowed = authedUser !== null;
    console.log(`isAllowed : ${isAllowed}`);
    if (!isAllowed) {
      navigate(redirectPath);
    }
  }, [authedUser, redirectPath, navigate]);

  return children;
};

export default ProtectedRoute;
