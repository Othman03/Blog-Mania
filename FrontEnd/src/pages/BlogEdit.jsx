import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

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

  // Populate form fields when blog data is fetched
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
      setCategory(blog.category || "Anime");
    }
  }, [blog]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = { title, body, author, category };

    try {
      const response = await fetch(`http://localhost:8090/blogs/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog), // Correctly stringify the body
      });

      if (!response.ok) {
        throw new Error("Failed to update the blog");
      }

      const data = await response.json();
      console.log("Blog updated:", data);

      navigate("/blogs/" + id); // Navigate to the updated blog
    } catch (error) {
      console.error("Error updating blog:", error);
    }
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
