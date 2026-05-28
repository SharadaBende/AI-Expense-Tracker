// Save token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token (logout)
export const logout = () => {
  localStorage.removeItem("token");
};

// Check login
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};