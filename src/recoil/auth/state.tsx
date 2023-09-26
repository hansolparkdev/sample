import { atom, selector, selectorFamily } from "recoil";
import { APICore } from "@/../axiosConfig";
import {
  API_RESPONSE_RESULT_SUCCESS,
  API_URL_COMMON_CONSTANT,
} from "@/app/config";

export interface AuthParams {
  username: string;
  password: string;
  grant_type?: string;
  scope?: string;
}

//type Param = ListParam;
const api = new APICore();
export const authState: any = atom({
  key: "authState",
  default: {},
});

export const loginState: any = atom({
  key: "loginState",
  default: {
    username: "",
    password: "",
    grant_type: "password",
  },
});

export const getAuthSelector = selector({
  key: "getAuthSelector",
  get: async ({ get }) => {
    const loginParams = get(loginState);
    const response = await api.auth("/oauth/token", loginParams);
    console.log("response", response);
    //const response = await api.get("/oauth/token", { menuId: menuId });
    return response;
  },
  set: ({ set }, newValue) => {
    set(loginState, newValue);
  },
});

export const getCommonCodeSelector = selectorFamily({
  key: "getCommonCodeSelector",
  get:
    (codeKey: any) =>
    async ({ get }) => {
      if (!codeKey) return [];
      const params = { codeGroupKey: codeKey };
      const response: any = await api.get(
        API_URL_COMMON_CONSTANT + "/anm/web/common/code-values",
        params
      );

      console.log("response", response);
      if (response?.resultCode === API_RESPONSE_RESULT_SUCCESS) {
        return response.codeValueList;
      } else {
        return [];
      }
    },
});
