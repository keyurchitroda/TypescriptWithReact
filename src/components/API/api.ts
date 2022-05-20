import axios from "axios";

export const api = {
  header: () => {
    let header = {};
    return header;
  },
  getToken: () => {
    const token = localStorage.getItem("token");
    let headers = api.header();
    const header = {
      x_auth_token: `${token}`,
    };
    headers = { ...headers, ...header };
    return header;
  },

  getMethod: (url: any, headersNew?: any) => {
    let headers = api.getToken();
    headers = {
      ...headers,
      ...headersNew,
    };
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          headers: headers,
        })
        .then((res) => {
          setTimeout(() => {}, 1000);
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            reject(err);
          } else {
            reject(err);
          }
        });
    });
  },

  deleteMethod: (url: any, headersNew: any) => {
    const headers = api.getToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          if (err && err.response?.data) {
          }
          reject(err);
        });
    });
  },

  postMethod: (url: any, data: any, header?: any) => {
    let headers = api.getToken();
    if (header) {
      headers = {
        ...headers,
        ...header,
      };
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  putMethod: (url: any, data: any, header = {}) => {
    const headers = api.getToken();
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, {
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
