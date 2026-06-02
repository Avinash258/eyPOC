import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

export const validateSchema = <T>(schema: JSONSchemaType<T>, payload: unknown): boolean => {
  const validate = ajv.compile(schema);
  return validate(payload) as boolean;
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
