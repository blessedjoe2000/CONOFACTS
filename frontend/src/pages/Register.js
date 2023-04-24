import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import "./pages.css";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isPending, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if (message.includes("email")) {
        toast.error("Email is already taken. Please use a different email.");
      } else {
        toast.error(message);
      }
    }
    if (isSuccess && user) {
      toast.success("Registration successful");
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  if (isPending) {
    return <Spinner />;
  }

  return <RegisterForm />;
}

export default Register;
