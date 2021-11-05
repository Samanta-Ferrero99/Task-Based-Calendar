// Import dependencies
import axios from "axios";
import authHeader from "./authHeader";

// API base URL for authentication
const API_URL = "http://localhost:5000/api/auth/";

/**
 * Perform a check for user access to permissioned pages.
 */
const verifyUserAuth = () => {
  return axios.get(API_URL + "verify", { headers: authHeader() });
};

const UserService = {
  verifyUserAuth: verifyUserAuth,
};

export default UserService;
