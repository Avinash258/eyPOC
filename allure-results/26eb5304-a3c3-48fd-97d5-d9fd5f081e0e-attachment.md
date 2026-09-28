# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\api\users.api.spec.ts >> API Automation - Users >> POST create user @sanity
- Location: tests\api\users.api.spec.ts:35:7

# Error details

```
AxiosError: Request failed with status code 403
```

# Test source

```ts
  1  | import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
  2  | import { env } from "../../config/env";
  3  | import { constants } from "../../config/constants";
  4  | import { retry } from "../../utils/retry";
  5  | 
  6  | export class ApiClient {
  7  |   private readonly client: AxiosInstance;
  8  |   private token: string | null = null;
  9  | 
  10 |   constructor(baseURL = env.baseApiUrl) {
  11 |     this.client = axios.create({
  12 |       baseURL,
  13 |       timeout: constants.timeouts.api
  14 |     });
  15 |   }
  16 | 
  17 |   async authenticate(): Promise<void> {
  18 |     this.token = `synthetic-token-${Date.now()}`;
  19 |   }
  20 | 
  21 |   private withToken(config?: AxiosRequestConfig): AxiosRequestConfig {
  22 |     return {
  23 |       ...config,
  24 |       headers: {
  25 |         ...(config?.headers ?? {}),
  26 |         ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
  27 |       }
  28 |     };
  29 |   }
  30 | 
  31 |   get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  32 |     return retry(
  33 |       async () => (await this.client.get<T>(path, this.withToken(config))).data,
  34 |       env.retryCount,
  35 |       env.retryDelayMs,
  36 |       `GET ${path}`
  37 |     );
  38 |   }
  39 | 
  40 |   post<T>(path: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
  41 |     return retry(
> 42 |       async () => (await this.client.post<T>(path, body, this.withToken(config))).data,
     |                    ^ AxiosError: Request failed with status code 403
  43 |       env.retryCount,
  44 |       env.retryDelayMs,
  45 |       `POST ${path}`
  46 |     );
  47 |   }
  48 | 
  49 |   put<T>(path: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
  50 |     return retry(
  51 |       async () => (await this.client.put<T>(path, body, this.withToken(config))).data,
  52 |       env.retryCount,
  53 |       env.retryDelayMs,
  54 |       `PUT ${path}`
  55 |     );
  56 |   }
  57 | 
  58 |   delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  59 |     return retry(
  60 |       async () => (await this.client.delete<T>(path, this.withToken(config))).data,
  61 |       env.retryCount,
  62 |       env.retryDelayMs,
  63 |       `DELETE ${path}`
  64 |     );
  65 |   }
  66 | }
  67 | 
```