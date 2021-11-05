// Import dependencies
import axios from "axios";
import qs from "qs";

/** Base URL for authentication API requests */
const API_URL = "http://localhost:5000/api/auth/";

/**
 * Performs an API request for a new user registration.
 * @param user the user object with a username, email, password, 
 * and password2 (confirm password for validations).
 * @return the response object.
 */
const register = (user) => {

  // Convert data into a usable form for query string
  const data = qs.stringify({
    username: user.username,
    email: user.email,
    password: user.password,
    password2: user.password2,
  });

  // Request configuration 
  const config = {
    method: "post",
    url: `${API_URL}register`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  // Make the request and return the response or error.
  return axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

/**
 * Performs an API request for an existing user login.
 * @param user the user object with an email and password.
 * @return the response object.
 */
const login = (user) => {

  // Convert data into a usable form for query string
  const data = qs.stringify({
    email: user.email,
    password: user.password,
  });

  // Request configuration 
  const config = {
    method: "post",
    url: "http://localhost:5000/api/auth/login",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  // Make the request and return the response or error.s
  return axios(config)
    .then(function (response) {
      if (response.data.token) {
        const storage = {
          user: user.email,
          token: response.data.token,
        };
        localStorage.setItem("user", JSON.stringify(storage));
      }
      return response;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

/**
 * Utility for performing user logout.
 */
const logout = () => {
  localStorage.removeItem("user");
};

/**
 * Returns the current user with their access token.
 */
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Export as AuthService
const AuthService = {
  register: register,
  login: login,
  logout: logout,
  getCurrentUser: getCurrentUser,
}

export default AuthService;
