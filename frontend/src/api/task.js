import http from '../services/httpService';

const createTask = (task) => http.post('/tasks', task);

export { createTask };