import http from "../services/httpService";

const postLogin = (user) => http.post("/auth/login", user);
const postLogout = () => http.post("/auth/logout");
const postRegister = (user) => http.post("/auth/register", user);
const getUser = () => http.get("/user");

export {
  postLogin,
  postLogout,
  postRegister,
  getUser,
};