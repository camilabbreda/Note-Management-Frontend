import axios, { AxiosInstance } from 'axios';

class Webserver {
  private _token: string | undefined;
  public notesManagementApi: AxiosInstance;

  constructor() {
    this.notesManagementApi = this.noteManagementInstace();
  }

  public set token(token: string) {
    this._token = token;
    this.notesManagementApi = this.noteManagementInstace();
  }

  private noteManagementInstace() {
    const axiosInstance = axios.create({
      baseURL: process.env.NOTES_MANAGEMENT_BACKEND_URL,
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
