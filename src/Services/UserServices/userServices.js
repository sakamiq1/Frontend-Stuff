import api from "./api";

const logIn = (data) =>
  api.post(`${api.url.contents}/dang-nhap`, data).then((res) => res.data);

const userServices = {
  logIn,
};

export default userServices;
