import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import merge from 'lodash/merge';

class HttpServer {
  private instance!: AxiosInstance;

  private defaults: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.init();
  }

  public init({
    config,
    configFn
  }: {
    config?: AxiosRequestConfig;
    configFn?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  } = {}) {
    const http = axios.create(merge(this.defaults, config));

    http.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
        if (configFn) {
          const requestConfig = configFn(config);

          if (requestConfig instanceof Promise) {
            return requestConfig.then(newConfig => Promise.resolve(merge(config, newConfig)));
          }

          return merge(config, requestConfig || {});
        }

        return config;
      },
      error => Promise.reject(error)
    );

    this.instance = http;
    return http;
  }

  public get request(): AxiosInstance {
    return this.http;
  }

  public setAccessToken(token: string) {
    if (token) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return;
    }

    delete this.instance.defaults.headers.common.Authorization;
  }
}

const httpInstance = new HttpServer();

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const clientId = process.env.NEXT_PUBLIC_API_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_API_CLIENT_SECRET;

httpInstance.init({
  config: {
    baseURL: baseUrl,
    headers: {
      'client-id': clientId,
      'client-secret': clientSecret
    }
  }
});

export default httpInstance;
