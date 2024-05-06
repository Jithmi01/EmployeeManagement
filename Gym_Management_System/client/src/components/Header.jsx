import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-black ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/emp">
          <h1 className="font-bold text-white ">Gym</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-white">Home</li>
          </Link>

          {currentUser && currentUser.isEmployeManger && (
            <Link to="/profile">
              <li className="text-white">Dashbord</li>
            </Link>
          )}

          {currentUser ? (
            <span onClick={handleSignout} className="cursor-pointer text-white">
              Sign Out
            </span>
          ) : (
            <>
              <Link to="/sign-in">
                <li className="text-white" >Sing In</li>
              </Link>
              <Link to="/attend">
                <li className="text-white">Attendace</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
