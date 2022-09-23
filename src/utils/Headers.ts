class Headers {
  // headers: { token: string };
  Authorization?: string;

  constructor(token?: string) {
    this.Authorization = token;
  }
}

export default Headers;
