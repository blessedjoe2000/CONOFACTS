import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import PostForm from "../components/Timeline/PostForm";
import { getPosts, reset } from "../features/post/postSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { posts, isPending, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  if (isPending) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1> {user && `Welcome ${user.username}`}</h1>
        <p>Post Dashboard</p>
      </section>
      <section className="content">
        <PostForm />
      </section>
    </>
  );
}

export default Dashboard;
