import http from '../services/httpService';

const createTask = (task, user, setError, setSuccess) => {
  let status = null;
  http.post('/tasks', task, {headers: {'user': user.id}}).then((res) => {
    console.log("SUCCESS CREATING TASK");
    console.log(res);
    setError(false);
    setSuccess(true);
  }).catch((err) => {
    console.log('ERROR CREATING TASK');
    console.log(err);
    setError(true);
    setSuccess(false);
  });
}

const taskAPI = {
  createTask: createTask,
}

export { taskAPI };