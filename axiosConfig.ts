// axiosConfig.js
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import config from "@/app/config";

const baseURL = process.env.NEXT_PUBLIC_API_URL
    , isServer = typeof window === 'undefined'

const instance = axios.create({
  baseURL  
});

instance.defaults.baseURL = config.API_URL;
instance.interceptors.request.use(async (config: any) => {
  if (isServer) {

    const { cookies } = (await import('next/headers'))
        , token = cookies().get('token')?.value

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  else {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')

      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
      }
  }

  return config
})

instance.defaults.headers.common['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7';

const AUTH_SESSION_KEY = "ubold_user";

const setAuthorization = (token: string | null) => {
  if (token) instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  else delete instance.defaults.headers.common["Authorization"];
};

class APICore {
  // GET
  get = (url: string, params: any) => {
    let response;
    if (params) {
      let queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + encodeURIComponent(params[key]))
          .join("&")
        : "";
      response = instance.get(`${url}?${queryString}`, params)
    } else {
      response = instance.get(`${url}`, params);
    }
    return response
  }
  getFile = (url: string, params: any) => {}
  auth = (url: string, data: any) => {
    console.log(data)
    let credentials = btoa("future-macs-admin-api" + ":" + "futureadmin2023");
    const config: AxiosRequestConfig = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + credentials,
      },
    };
    return instance.post(url, qs.stringify(data), config);
  }
  create = () => {}
  updatePatch = () => {}
  update = () => {}
  delete = () => {}
  createWithFile = () => {}
  updateWithFile = () => {}
  setLoggedInUser = (token: any, id?: any) => {
    if (token) {
      setAuthorization(token);
      sessionStorage.setItem(AUTH_SESSION_KEY, token);
      sessionStorage.setItem("loginId", id);
    } else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
      sessionStorage.removeItem("loginId");
    }
  };
  getLoggedInUser = () => {}
  getUserId = () => {}
  setUserInSession = () => {}
}

// let token = getUserFromCookie();
// if (token) {
//   setAuthorization(token);
// }

export { APICore, instance };