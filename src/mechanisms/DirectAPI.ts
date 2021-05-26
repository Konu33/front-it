import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, Method} from 'axios';

import UnauthorizedException from '../exceptions/UnauthorizedException';
import {isAxiosError} from '../utils/axios-utils';

class DirectAPI {
  private axiosInstance: AxiosInstance;
  private readonly baseUrl: string = process.env.REACT_APP_API_URL as string;

  constructor() {
    this.attachAuthorizationToken = this.attachAuthorizationToken.bind(this);
    this.detachAuthorizationToken = this.detachAuthorizationToken.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.createAxiosInstance = this.createAxiosInstance.bind(this);
    this.callAxios = this.callAxios.bind(this);

    this.axiosInstance = this.createAxiosInstance();
  }

  public attachAuthorizationToken(token: string) {
    this.axiosInstance = this.createAxiosInstance({
      headers: {Authorization: `Bearer ${token}`},
    });
  }
  public isAuthorizationTokenAttached(): boolean {
    return Object.keys(this.axiosInstance.defaults.headers).includes('Authorization');
  }
  public detachAuthorizationToken() {
    this.axiosInstance = this.createAxiosInstance();
  }

  public async get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.callAxios<T, R>('GET', url, config);
  }

  public async post<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.callAxios<T, R>('POST', url, config);
  }

  public async put<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.callAxios<T, R>('PUT', url, config);
  }

  public async patch<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.callAxios<T, R>('PATCH', url, config);
  }

  public async delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.callAxios<T, R>('DELETE', url, config);
  }

  private createAxiosInstance(options: AxiosRequestConfig | undefined = {}): AxiosInstance {
    return axios.create({baseURL: this.baseUrl, ...options});
  }

  private async callAxios<T, R = AxiosResponse<T>>(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const formattedUrl = url.length > 0 && url[0] === '/' ? url : '/' + url;

    try {
      return await this.axiosInstance.request({method, url: formattedUrl, ...(config || {})});
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (isAxiosError(e) && e.response && (e.response.status === 401 || e.response.status === 403))
          throw new UnauthorizedException(`Got status \`${e.response.status}\` on request to \`${formattedUrl}\`.`);
      }

      throw e; // standard forward
    }
  }
}

export default new DirectAPI();
