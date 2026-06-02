import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  name: "qa-platform",
  level: env.logLevel
});
