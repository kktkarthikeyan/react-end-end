import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const EditPost = ({
  posts,
  handleEdit,
  editBody,
  editTitle,
  setEditBody,
  setEditTitle,
  handleCancel
}) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            ></input>
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
            <button type="submit" onClick={() => handleCancel()}>
              Cancel
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found!</h2>
          <p> Well, that's disappointing.</p>

          <p>
            <Link to="/">Visit out Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};
