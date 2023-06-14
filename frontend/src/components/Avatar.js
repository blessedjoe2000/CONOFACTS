import { useSelector } from "react-redux";

function Avatar() {
  const { name, imageUrl } = useSelector((state) => state.auth.user);
  return (
    <div>
      <img className="avatar" src={imageUrl} alt={`profile of ${name}`} />
    </div>
  );
}

export default Avatar;
