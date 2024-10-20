import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies, , removeCookies] = useCookies(["jwtToken"]);
  const token = cookies.jwtToken;

  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8090/blogs/` + id);
  console.log(blog);

  const handleClick = () => {
    if (!token) {
      alert("Unauthorized! No token found.");
      return;
    }

    fetch(`http://localhost:8090/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the blog.");
        }
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while deleting the blog.");
      });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
          <Link to={`/edit/${blog.id}`}>
            <button>Edit Blog</button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
