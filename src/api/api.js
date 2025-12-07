import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// -------- AUTH --------
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

// -------- USERS --------
export const register = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
};
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Get user error:", err);
    throw err;
  }
};

export const followUser = async (userId, targetUserId) => {
  const response = await api.post(`/follows/${userId}/${targetUserId}`);
  return response.data;
};

export const unfollowUser = async (userId, targetUserId) => {
  const response = await api.delete(`/follows/${userId}/${targetUserId}`);
  return response.data;
};
// -------- POSTS --------
export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (post) => {
  const response = await api.post("/posts", post);
  return response.data;
};

// -------- COMMENTS --------
export const getCommentsByPost = async (postId) => {
  try {
    const response = await api.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Get comments error:", error.message);
    return [];
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    console.error("Add comment error:", error.message);
    throw error;
  }
};

// -------- LIKES --------
// Note: backend uses /likes/{user_id}/{post_id}
export const toggleLike = async (userId, postId, liked) => {
  try {
    if (liked) {
      const response = await api.delete(`/likes/${userId}/${postId}`);
      return response.data;
    } else {
      const response = await api.post(`/likes/${userId}/${postId}`);
      return response.data;
    }
  } catch (error) {
    console.error("Toggle like error:", error.message);
    throw error;
  }
};

export default api;
