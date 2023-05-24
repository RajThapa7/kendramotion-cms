export const isAuthenticated = () => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  // Check if the token exists and is not expired
  if (token) {
    return true;
  }

  return false;
};
