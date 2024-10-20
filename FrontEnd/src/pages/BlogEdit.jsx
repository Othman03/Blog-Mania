import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const BlogEdit = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["jwtToken"]);
  const { data: blog, isPending } = useFetch(
    "http://localhost:8090/blogs/" + id
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const token = cookies.jwtToken;

  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
      setCategory(blog.category || "Anime");
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = { title, body, author, category };
    console.log(updatedBlog);

    axios
      .put(`http://localhost:8090/blogs/${id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {blog && (
        <div className="create">
          <h2>Edit Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Blog Title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Blog Body</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>

            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Anime">Anime</option>
              <option value="Video Games">Video Games</option>
              <option value="Tech">Tech</option>
            </select>

            <label>Blog Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            {!isPending && <button type="submit">Save</button>}
            {isPending && <button disabled>Editing Blog...</button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogEdit;
