import http from '../services/httpService';

const createTask = (task, user, setError, setSuccess) => {
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

const createChronicle = (chronicle, user, setError, setSuccess) => {
  http.post('/chronicles', chronicle, { headers: { user: user.id } })
    .then((res) => {
      console.log('SUCCESS CREATING CHRONICLE');
      console.log(res);
      setError(false);
      setSuccess(true);
    })
    .catch((err) => {
      console.log('ERROR CREATING CHRONICLE');
      console.log(err);
      setError(true);
      setSuccess(false);
    });
};

const getAllChronicles = (user, setChronicles) => {
  http.get('/chronicles', { headers: { user: user.id } }).then((res) => {
    console.log(res);
    setChronicles(res.data.chronicles);
  });
}

const getAllTasks = (user, setTasks) => {
  http.get('/tasks', { headers: { user: user.id } }).then((res) => {
    console.log(res);
    setTasks(res.data.tasks);
  });
};

const taskAPI = {
  createTask: createTask,
  createChronicle: createChronicle,
  getAllChronicles: getAllChronicles,
  getAllTasks: getAllTasks,
}

export { taskAPI };