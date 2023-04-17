import Feed from "./Feed";

const Home = ({ posts, isLoading, fetchError }) => {
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg"> Loading Post...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className="statusMsg" style={{ marginTop: "2rem" }}>
            No post to display
          </p>
        ))}
    </main>
  );
};

export default Home;
