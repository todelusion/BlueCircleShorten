export interface ErrorResponse {
  message: string;
  name: string;
  code: string;
  status: number;
  response: Response;
}
export interface TokenResponse {
  status: string;
  user?: object;
}

export interface ForgetPasswordResponse {
  status: string;
  message: string;
}

export interface Response {
  data: Data;
  status: number;
  statusText: string;
}
export interface Data {
  message: string;
}
