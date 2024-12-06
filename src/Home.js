import Bloglist from "./BlogList";
import useFetch from "./usefetch";

const Home = () => {
  const {
    error,
    ispending,
    data: blogs,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <div> {error} </div>}
      {ispending && <div>Loading...</div>}
      {blogs && <Bloglist blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
