import api from "./api";

const getListTool = () => api.get(`${api.url.contents}/danh-sach-tool`).then((res) => res.data);

const getToolById = (id) => api.get(`${api.url.contents}/chi-tiet?id=${id}`).then((res) => res.data)

const addTool = (data) =>
  api.post(`${api.url.contents}/them-tool`, data).then((res) => res.data);

const editTool = (id, data) =>
  api.put(`${api.url.contents}/sua-tool?id=${id}`, data).then((res) => res.data);

const deleteTool = (id) =>
  api.delete(`${api.url.contents}/xoa-tool?id=${id}`).then((res) => res.data);

const listToolServices = {
  list: getListTool,
  getToolById,
  addTool,
  editTool,
  deleteTool,
};

export default listToolServices;
