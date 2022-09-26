// export interface ErrorResponse {
//   message: string;
//   name: string;
//   code: string;
//   status: number;
//   response: Response;
// }
// export interface TokenResponse {
//   status: string;
//   user?: object;
// }

// export interface ForgetPasswordResponse {
//   status: string;
//   message: string;
// }


// export interface Data {
//   message: string;
// }
// export interface Config {
//   transformRequest: null[];
//   transformResponse: null[];
//   timeout: number;
//   xsrfCookieName: string;
//   xsrfHeaderName: string;
//   maxContentLength: number;
//   maxBodyLength: number;
//   method: string;
//   url: string;
//   data: string;
// }

// export interface Response extends Data {}

export interface ErrorResponse {
  config: Config;
  message: string;
  name: string;
  code: string;
  status: number;
  response: Response;
}
export interface SuccessResponse {
  config: Config;
  data: Data;
  status: number;
  statusText: string;
}

export interface Response {
  data: Data;
  status: number;
  statusText: string;
  config: Config;
}

export interface Data {
  message: string;
  user?: User;
}

export interface User {
  name: string;
  token: string;
}

export interface Config {
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  method: string;
  url: string;
  data: string;
}
