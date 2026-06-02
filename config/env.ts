import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "qa",
  isCI: process.env.CI === "true",
  baseUiUrl: process.env.BASE_UI_URL ?? "https://www.saucedemo.com",
  baseApiUrl: process.env.BASE_API_URL ?? "https://jsonplaceholder.typicode.com",
  authUrl: process.env.AUTH_URL ?? "https://example-auth.local/token",
  clientId: process.env.CLIENT_ID ?? "",
  clientSecret: process.env.CLIENT_SECRET ?? "",
  apiHealthEndpoint: process.env.API_HEALTH_ENDPOINT ?? "/health",
  monitoringStatusEndpoint: process.env.MONITORING_STATUS_ENDPOINT ?? "/status",
  wiremockUrl: process.env.WIREMOCK_URL ?? "http://localhost:8080",
  retryCount: toNumber(process.env.RETRY_COUNT, 3),
  retryDelayMs: toNumber(process.env.RETRY_DELAY_MS, 500),
  logLevel: process.env.LOG_LEVEL ?? "info",
  grafanaBaseUrl: process.env.GRAFANA_BASE_URL ?? "",
  grafanaApiKey: process.env.GRAFANA_API_KEY ?? "",
  appInsightsAppId: process.env.APP_INSIGHTS_APP_ID ?? "",
  appInsightsApiKey: process.env.APP_INSIGHTS_API_KEY ?? ""
};
