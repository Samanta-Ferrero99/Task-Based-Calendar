import { push } from 'connected-react-router';
import { login, logout } from '../actions/user';

import {
  postRegister,
  postLogin,
  postLogout,
} from '../../api/index';

export const attemptLogin = (user) => (dispatch) =>
  postLogin(user).then(({ data }) => {
    dispatch(login(data.user));
    dispatch(push('/dashboard'));
  });

export const attemptLogout = () => (dispatch) =>
  postLogout()
    .then(() => {
      dispatch(logout());
    })
    .finally(() => {
      dispatch(push('/login'));
    });

export const attemptRegister = (newUser) => (dispatch) => postRegister(newUser).then(() => {
  dispatch(push('/welcome'));
});