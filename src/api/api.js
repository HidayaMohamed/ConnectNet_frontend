// Import axios for HTTP requests
import axios from "axios";

// Create an axios instance with base URL of your backend
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // change if your backend is on a different host/port
});

// ----------- Auth APIs -----------
export const login = async (username, password) => {
  // Send POST request to /auth/login with credentials
  const response = await api.post("/auth/login", { username, password });
  return response.data; // Return the user object
};

// ----------- User APIs -----------
export const getUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const getUser = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// ----------- Post APIs -----------
export const getPosts = async () => {
  const response = await api.get("/posts/");
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post("/posts/", postData);
  return response.data;
};

// ----------- Comment APIs -----------
export const getCommentsByPost = async (postId) => {
  const response = await api.get(`/comments/post/${postId}`);
  return response.data;
};

export const addComment = async (commentData) => {
  const response = await api.post("/comments/", commentData);
  return response.data;
};

// ----------- Like APIs -----------
export const likePost = async (userId, postId) => {
  const response = await api.post(`/likes/${userId}/${postId}`);
  return response.data;
};

export const unlikePost = async (userId, postId) => {
  const response = await api.delete(`/likes/${userId}/${postId}`);
  return response.data;
};

export const getLikes = async (postId) => {
  const response = await api.get(`/likes/post/${postId}`);
  return response.data; // returns number of likes
};

// ----------- Follow APIs -----------
export const followUser = async (followerId, followingId) => {
  const response = await api.post(`/follows/${followerId}/${followingId}`);
  return response.data;
};

export const unfollowUser = async (followerId, followingId) => {
  const response = await api.delete(`/follows/${followerId}/${followingId}`);
  return response.data;
};

export const getFollowers = async (userId) => {
  const response = await api.get(`/follows/followers/${userId}`);
  return response.data;
};

export const getFollowing = async (userId) => {
  const response = await api.get(`/follows/following/${userId}`);
  return response.data;
};
