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

const createTaskForChronicle = (task, user, setError, setSuccess, setId) => {
  http
    .post('/tasks', task, { headers: { user: user.id } })
    .then((res) => {
      console.log('SUCCESS CREATING TASK');
      console.log(res);
      setError(false);
      setSuccess(true);
      setId(res.data?.task?._id || null);
    })
    .catch((err) => {
      console.log('ERROR CREATING TASK');
      console.log(err);
      setError(true);
      setSuccess(false);
      setId(null);
    });
};

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

const editChronicle = (chronicle, user, setError, setSuccess) => {
  http
    .put('/chronicles', chronicle, { headers: { user: user.id } })
    .then((res) => {
      console.log('SUCCESS EDITING CHRONICLE');
      console.log(res);
      setError(false);
      setSuccess(true);
    })
    .catch((err) => {
      console.log('ERROR EDITING CHRONICLE');
      console.log(err);
      setError(true);
      setSuccess(false);
    });
};

const editTask = (task, user, setError, setSuccess) => {
  http
    .put('/tasks', task, { headers: { user: user.id } })
    .then((res) => {
      console.log('SUCCESS EDITING TASK');
      console.log(res);
      setError(false);
      setSuccess(true);
    })
    .catch((err) => {
      console.log('ERROR EDITING TASK');
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

const getTaskByChronicle = (user, chronicle, setTasks) => {
  http
    .get('/tasks/chronicle/' + chronicle, { headers: { user: user.id } })
    .then((res) => {
      console.log(res);
      setTasks(res.data.tasks);
    });
};

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
  editChronicle: editChronicle,
  createTaskForChronicle: createTaskForChronicle,
  getTaskByChronicle: getTaskByChronicle,
  editTask: editTask,
}

export { taskAPI };