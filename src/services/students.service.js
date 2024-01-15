import axios from "axios";

const API_URL = "https://despesas-coral.vercel.app/api/v2/students/";

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = () => {
  return axios.get(API_URL);
};

const getById = (number) => {
  return axios.get(API_URL + number);
};

const createORupdate = (id, number, name, city, birthday) => {
  if(id == null){
    return create(number, name, city, birthday);
  }
  else {
    return update(id, number, name, city, birthday);
  }
};

const create = (number, name, city, birthday) => {
  return axios.post(API_URL + "create", { number, name, city, birthday });
};

const update = (id, number, name, city, birthday) => {
  return axios.put(API_URL + "update", { id, number, name, city, birthday });
};

const deleteUser = (number) => {
  return axios.delete(API_URL + "delete/" + number);
};

const StudentsService = {
  getAll,
  getById,
  createORupdate,
  create,
  update,
  deleteUser
}

export default StudentsService;