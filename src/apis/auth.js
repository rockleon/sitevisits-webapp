import { axios } from "../plugins/axios";

export function login(payload) {
  return axios({
    url: `rest-auth/login/`,
    method: "post",
    data: payload,
  });
}

export function me() {
  return axios({
    url: `me`,
    method: "get",
  });
}

export function createUser(payload) {
  return axios({
    url: `users/`,
    method: "post",
    data: payload,
  });
}