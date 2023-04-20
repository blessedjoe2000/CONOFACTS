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

  const { user, token, isPending, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  console.log("message", message);
  console.log("error", isError);

  useEffect(() => {
    if (isError) {
      return toast.error(message);
    }
    if (isSuccess || (user && token)) {
      toast.success("registration successful");
      navigate("/");
    }
    dispatch(reset());
  }, [user, token, isSuccess, isError, message, dispatch, navigate]);

  if (isPending) {
    return <Spinner />;
  }

  return <RegisterForm />;
}

export default Register;
