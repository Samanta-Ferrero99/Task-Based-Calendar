import { getUser } from '../../api/index';
import { setUser, resetUser } from './../actions/user';

export const attemptGetUser = () => (dispatch) =>
  getUser()
    .then((data) => {
      console.log(data);
      if (data.data.user) {
        dispatch(setUser(data.data.user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });
