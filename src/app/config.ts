const config = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_RESPONSE_RESULT_SUCCESS: "0000",
  };
  
  export const API_RESPONSE_ERROR_CODE = "errorCode";
  export const API_RESPONSE_RESULT_SUCCESS = "0000";
  export const API_URL_COMMON_CONSTANT = "/api/admin/v1";
  export const API_URL_COMMON_FILESTORE = "/web/common/filestore/";
  export const API_URL_ADMIN = "/sysmanage/admins/";
  export const API_URL_CODE = "/sysmanage/codes/";
  export const API_URL_MENU = "/sysmanage/menus/";
  export const API_URL_ROLE = "/sysmanage/roles/";
  export const API_URL_WEB = "/web/";
  export const API_URL_COMPANY = "/opermanage/companies/";
  export const API_URL_MEMBER = "/opermanage/members/";
  export const API_URL_ACCESS = "/accessmanage/accesses/";
  export const API_URL_ACCESS_HISTORY = "/accessmanage/accesshistories/";
  export const API_URL_PASS = "/accessmanage/passes/";
  export const API_URL_NOTICE = "/supportmanage/notice/";
  export const API_URL_COMPANIES = "common/admin/companies/"
  export const API_URL_COMMON_FILE_URL = config.API_URL + "/api/admin/v1/anm/web/common/filestore/";
  export default config;
  