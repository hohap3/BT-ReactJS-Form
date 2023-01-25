import axiosClient from "./axiosClient";

const studentApi = {
  getAll(params) {
    const url = `/students`;
    return axiosClient.get(url, { params });
  },

  removeByID(id) {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },

  getInfoByID(id) {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  addNew(data) {
    const url = `/students`;
    return axiosClient.post(url, data);
  },

  updateByID(data, id) {
    const url = `/students/${id}`;
    return axiosClient.put(url, data);
  },
};

export default studentApi;
