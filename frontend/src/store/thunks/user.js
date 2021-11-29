import { getUser } from '../../api/index';
import { setUser, resetUser } from './../actions/user';

export const attemptGetUser = () => (dispatch) =>
  getUser()
    .then((data) => {
      if (data.data.user) {
        dispatch(setUser(data.data.user));
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });
