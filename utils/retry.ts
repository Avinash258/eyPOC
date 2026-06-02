import { logger } from "./logger";

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number,
  operationName: string
): Promise<T> => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logger.warn({ operationName, attempt, error }, "Retryable operation failed");
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
};
