import axios, { AxiosInstance } from 'axios';

class Webserver {
  private _token: string | undefined;
  public notasManagementApi: AxiosInstance;

  constructor() {
    this.notasManagementApi = this.instanciaNotasManagementApi();
  }

  public set token(token: string) {
    this._token = token;
    this.notasManagementApi = this.instanciaNotasManagementApi();
  }

  private instanciaNotasManagementApi() {
    const axiosInstance = axios.create({
      baseURL: process.env.NOTES_MANAGEMENT_BACKEND,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (this._token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }
    return axiosInstance;
  }
}

const webserver = new Webserver();
export default webserver;
