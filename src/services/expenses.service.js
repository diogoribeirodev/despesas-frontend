import axios from "axios";

const API_URL = "https://despesas-coral.vercel.app/api/expenses/";

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getAll = () => {
  return axios.get(API_URL);
};

const getById = (number) => {
  return axios.get(API_URL + number);
};

const getPublicById = (number) => {
  return axios.get(
    "https://despesas-coral.vercel.app/api/" + "public/" + number,
  );
};

const createORupdate = (
  id,
  description,
  value,
  date,
  note,
  category,
  paid,
  paymentMethod,
  publico,
) => {
  if (id == null) {
    return create(
      description,
      value,
      date,
      note,
      category,
      paid,
      paymentMethod,
      publico,
    );
  } else {
    return update(
      id,
      description,
      value,
      date,
      note,
      category,
      paid,
      paymentMethod,
      publico,
    );
  }
};

const create = (
  description,
  value,
  date,
  note,
  category,
  paid,
  paymentMethod,
  publico,
) => {
  return axios.post(API_URL + "", {
    description,
    value,
    date,
    note,
    category,
    paid,
    paymentMethod,
    publico,
  });
};

const update = (
  id,
  description,
  value,
  date,
  note,
  category,
  paid,
  paymentMethod,
  publico,
) => {
  return axios.put(API_URL + id, {
    id,
    description,
    value,
    date,
    note,
    category,
    paid,
    paymentMethod,
    publico,
  });
};

const deleteExpense = (number) => {
  return axios.delete(API_URL + number);
};

const ExpensesService = {
  getAll,
  getById,
  createORupdate,
  create,
  update,
  deleteExpense,
  getPublicById,
};

export default ExpensesService;
