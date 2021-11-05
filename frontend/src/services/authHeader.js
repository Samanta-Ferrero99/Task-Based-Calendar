import AuthService from "./authService";

// Utility for retrieving the token for use in authentication header when
// performing permissioned requests.
export default function authHeader() {

  const user = AuthService.getCurrentUser();

  if (user && user.token) {
    return { 'token': user.token };
  } else {
    return {};
  }
}
