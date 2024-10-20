import BlogList from "../components/BlogList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:8090/blogs");
  console.log(blogs);

  return (
    <div className="flex flex-col items-center p-4">
      {error && <div>{error}</div>}
      {isPending && <p>Loading...</p>}
      {blogs && <BlogList blogs={blogs} title="All blogs" />}
    </div>
  );
};

export default Home;
