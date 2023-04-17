import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import api from "./api/posts";
import { EditPost } from "./EditPost";
import useWindowSize from "./api/hooks/useWindowSize";
import useAxiosFetch from "./api/hooks/useAxiosFetch";
function App() {
  const [posts, setPosts] = useState([]);

  const history = useNavigate();
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      history("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const [search, setSearch] = useState("");
  const [serachResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3501/posts"
  );

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (error) {
  //       // not in 200 response range
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleEdit = async (id) => {
    const newPost = {
      id: id,
      title: editTitle,
      datetime: format(new Date(), "MMMM dd, yyyy pp"),
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, newPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCancel = () => {
    history("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
      id: id,
      title: postTitle,
      datetime: format(new Date(), "MMMM dd, yyyy pp"),
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      const updateNewPost = [...posts, response.data];
      setPosts(updateNewPost);
      setPostTitle("");
      setPostBody("");
      history("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="App">
      {/* <Router> */}
      <Header title="React Js Blog" width={width}></Header>
      <Nav search={search} setSearch={setSearch}></Nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={serachResults}
              fetchError={fetchError}
              isLoading={isLoading}
            ></Home>
          }
        ></Route>
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        ></Route>
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleCancel={handleCancel}
            />
          }
        ></Route>
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        ></Route>
        <Route path="/about" Component={About}></Route>
        <Route path="*" Component={Missing}></Route>
      </Routes>

      <Footer></Footer>
      {/* </Router> */}
    </div>
  );
}

export default App;
