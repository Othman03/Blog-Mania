import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
  return (
    <nav className=" w-full flex p-4 justify-between">
      <Link to="/">
        <h1 className="text-accent font-extrabold text-3xl">Blog Mania</h1>
      </Link>

      <div className="flex gap-2 items-center">
        <Link to="/dashboard">blogs</Link>
        <Link to="/create"> New Blog</Link>
        <button
          onClick={() => {
            setIsLogged(false);
            removeCookie("jwtToken", { path: "/" });
          }}
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
