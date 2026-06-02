import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { env } from "../../config/env";
import { constants } from "../../config/constants";
import { retry } from "../../utils/retry";

export class ApiClient {
  private readonly client: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL = env.baseApiUrl) {
    this.client = axios.create({
      baseURL,
      timeout: constants.timeouts.api
    });
  }

  async authenticate(): Promise<void> {
    this.token = `synthetic-token-${Date.now()}`;
  }

  private withToken(config?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        ...(config?.headers ?? {}),
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
      }
    };
  }

  get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return retry(
      async () => (await this.client.get<T>(path, this.withToken(config))).data,
      env.retryCount,
      env.retryDelayMs,
      `GET ${path}`
    );
  }

  post<T>(path: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    return retry(
      async () => (await this.client.post<T>(path, body, this.withToken(config))).data,
      env.retryCount,
      env.retryDelayMs,
      `POST ${path}`
    );
  }

  put<T>(path: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    return retry(
      async () => (await this.client.put<T>(path, body, this.withToken(config))).data,
      env.retryCount,
      env.retryDelayMs,
      `PUT ${path}`
    );
  }

  delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return retry(
      async () => (await this.client.delete<T>(path, this.withToken(config))).data,
      env.retryCount,
      env.retryDelayMs,
      `DELETE ${path}`
    );
  }
}
