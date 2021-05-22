import { axios } from "../plugins/axios";

export function getProjects() {
  return axios({
    url: `projects/`,
    method: "get",
  });
}

export function getProjectById(id) {
  return axios({
    url: `projects/${id}/`,
    method: "get",
  });
}

export function postProject(payload) {
  return axios({
    url: `projects/`,
    method: "post",
    data: payload,
  });
}

export function patchProject(id, payload) {
  return axios({
    url: `projects/${id}/`,
    method: "patch",
    data: payload,
  });
}

export function deleteProject(id) {
  return axios({
    url: `projects/${id}/`,
    method: "delete",
  });
}
