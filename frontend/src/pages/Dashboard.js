import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import PostForm from "../components/Postform/PostForm";
import Timeline from "../components/Timeline/Timeline";
import { getAllPosts, resetPost } from "../features/post/postSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isPending, isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      return navigate("/login");
    }

    dispatch(getAllPosts());

    return () => {
      dispatch(resetPost());
    };
  }, [user, navigate, dispatch, isError, message]);

  if (isPending) {
    return <Spinner />;
  }
  return (
    <>
      <section className="form-heading">
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
