import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import PostForm from "../components/Postform/PostForm";
import Timeline from "../components/Timeline/Timeline";
import { getInterest } from "../features/interests/interestSlice";
import { getAllPosts, reset } from "../features/post/postSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isPending, isError, message } = useSelector((state) => state.posts);
  const { interests } = useSelector((state) => state.interests);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllPosts());
    dispatch(getInterest());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message, interests]);

  if (isPending) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1> {user && `Welcome ${user.name}`}</h1>
      </section>
      <section className="content">
        <PostForm />
        <Timeline />
      </section>
    </>
  );
}

export default Dashboard;
