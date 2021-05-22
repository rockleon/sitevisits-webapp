"use strict";

import Vue from "vue";
import axios from "axios";

let config = {
  baseURL: process.env.VUE_APP_API_URL || "",
  timeout: 60 * 1000, // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem("SITEVISITS_TOKEN");
    if (token && token !== "undefined")
      config.headers["Authorization"] = "Token " + token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return Promise.resolve(response.data);
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error.response);
  }
);

// create axios plugin
Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export { _axios as axios };
