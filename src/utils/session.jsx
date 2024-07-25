export const createUserSession = (token, userDetails) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userDetails));
   
  }
};

export const getUserSession = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    return { token, user };
  }
  return { token: null, user: null };
};

export const clearUserSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
