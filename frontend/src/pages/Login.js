import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { reset } from "../features/auth/authSlice";

import "./pages.css";
import LoginForm from "../components/LoginForm";

function Login() {
  const { user, token, isPending, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || (user && token)) {
      toast.success("user logged in successfully");
      navigate("/");
    }
    dispatch(reset());
  }, [user, token, isPending, isSuccess, isError, message, dispatch, navigate]);

  if (isPending) {
    return <Spinner />;
  }

  return <LoginForm />;
}

export default Login;
