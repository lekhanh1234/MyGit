import { useState, useEffect } from "react";
import { FaHeart, FaComment, FaPlusCircle, FaUserPlus } from "react-icons/fa";
import { GetAllpost, CreatePost, postComment, Likeposts, GetAlluser, postinviteFren, getUserName } from "../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [comments, setComments] = useState({}); // Trạng thái lưu bình luận
  const [token, setToken] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await GetAllpost();
        const profileData = await getUserName();
        setMe(profileData.detail);
        setPosts(data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
      const jwtToken = localStorage.getItem("jwtToken");
      setToken(jwtToken);
    };

    const fetchUsers = async () => {
      try {
        const data = await GetAlluser();
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const togglePostForm = () => setShowPostForm(!showPostForm);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim() && !newPostImage) {
      alert("Please add some content or an image!");
      return;
    }
    try {
      await CreatePost(newPostContent, newPostImage, token);
      setNewPostContent("");
      setNewPostImage(null);
      setShowPostForm(false);
      const updatedPosts = await GetAllpost();
      setPosts(updatedPosts.posts);
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };

  const handleAddFriend = async (userId) => {
    try {
      await postinviteFren(userId);
      alert("Friend request sent!");
    } catch (err) {
      console.error("Error adding friend:", err.message);
    }
  };

  const handleShowProfile = async () => {
    try {
      const profileData = await getUserName();
      setUserProfile(profileData.detail);
      console.log(profileData)
      setShowProfile(true);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!comments[postId]?.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      await postComment(postId, comments[postId]);
      const updatedPosts = await GetAllpost();
      setPosts(updatedPosts.posts);
      setComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error posting comment:", err.message);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100 border-r">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Friends</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="flex items-center space-x-4">
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{user.name}</p>
                {
                  !me?.friends.includes(user._id) && <button
                  onClick={() => handleAddFriend(user._id)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  <FaUserPlus className="inline mr-1" />
                  Add Friend
                </button>
                }
              </div>

            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4">
        <button
          onClick={handleShowProfile}
          className="fixed top-5 right-20 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
        >
          Profile
        </button>

        <div className="fixed bottom-5 right-5">
          <FaPlusCircle
            className="w-12 h-12 text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={togglePostForm}
          />
        </div>

        {showPostForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Create New Post
              </h2>
              <form onSubmit={handlePostSubmit} className="flex flex-col space-y-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPostImage(e.target.files[0])}
                  className="text-sm"
                />
                {newPostImage && (
                  <img
                    src={URL.createObjectURL(newPostImage)}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                )}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={togglePostForm}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {posts.map((post, index) => (
          <div
            key={index}
            className="max-w-md mx-auto mt-10 border border-gray-200 rounded-lg shadow-lg bg-white"
          >
            <div className="flex items-center p-4">
              <img
                src={post.author?.avatar || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold text-gray-800">{post.author?.name || "Unknown User"}</p>
                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="px-4 pb-2">
              <p className="text-sm text-gray-800">{post.title || "No Title"}</p>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="Post Content"
                className="w-full object-cover"
              />
            )}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <button onClick={() => Likeposts(post._id)}>
                  <FaHeart className="w-6 h-6 transition-transform transform hover:scale-110" />
                </button>
                <Link to="/chats">
                  <button>
                    <FaComment className="w-6 h-6 text-gray-500 hover:text-gray-600 transition-transform transform hover:scale-110" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="px-4 pb-2">
              <p className="text-sm font-semibold text-gray-700">
                {post?.likes?.length || 0} likes
              </p>
            </div>
            <div className="px-2 pb-2">
              <p className="text-sm font-bold text-gray-800 mb-3">Comments</p>
              <div className="space-y-2 max-h-20 overflow-y-auto">
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <img
                      src={comment.authorId?.avatar || "https://via.placeholder.com/40"}
                      alt="Commenter Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => handleCommentSubmit(e, post._id)}
                className="flex items-center mt-3"
              >
                <input
                  type="text"
                  value={comments[post._id] || ""}
                  onChange={(e) => setComments({ ...comments, [post._id]: e.target.value })}
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        ))}

        {showProfile && userProfile && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {userProfile.name} Profile
              </h2>
              <img
                src={userProfile.avatar || "https://via.placeholder.com/100"}
                alt={userProfile.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 text-center">{userProfile.email}</p>
              <button
                onClick={handleCloseProfile}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
