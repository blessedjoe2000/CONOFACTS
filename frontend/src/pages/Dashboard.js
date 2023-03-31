import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import PostForm from "../components/Timeline/PostForm";
import Timeline from "../components/Timeline/Timeline";
import { getPosts, reset } from "../features/post/postSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isPending, isError, message } = useSelector((state) => state.posts);
  const { interests } = useSelector((state) => state.interests);

  // console.log("interest", interests);

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
  }, [user, navigate, dispatch, isError, message, interests]);

  const onClick = () => {
    interests.map((interest) => {
      console.log(interest);
    });
  };

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
        <button onClick={onClick}>interest</button>
      </section>
      <section className="content">
        <PostForm />
        <Timeline />
      </section>
    </>
  );
}

export default Dashboard;
