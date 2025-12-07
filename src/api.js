const BASE_URL = "http://127.0.0.1:8000"; // change if different

export const api = {
  // ----------------- AUTH -----------------
  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ----------------- USERS -----------------
  fetchUsers: async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  },

  followUser: async (userId) => {
    const res = await fetch(`${BASE_URL}/follows/${userId}`, {
      method: "POST",
    });
    return res.json();
  },

  unfollowUser: async (userId) => {
    const res = await fetch(`${BASE_URL}/follows/${userId}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // ----------------- POSTS -----------------
  fetchPosts: async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    return res.json();
  },

  createPost: async (data) => {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  likePost: async (postId) => {
    const res = await fetch(`${BASE_URL}/likes/${postId}`, {
      method: "POST",
    });
    return res.json();
  },

  unlikePost: async (postId) => {
    const res = await fetch(`${BASE_URL}/likes/${postId}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // ----------------- COMMENTS -----------------
  fetchComments: async (postId) => {
    const res = await fetch(`${BASE_URL}/comments/${postId}`);
    return res.json();
  },

  addComment: async (postId, content) => {
    const res = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    return res.json();
  },
};
