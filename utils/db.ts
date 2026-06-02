import { logger } from "./logger";

export interface TestUserRecord {
  id: string;
  email: string;
  status: "active" | "inactive";
}

const inMemoryDb = new Map<string, TestUserRecord>();

export const db = {
  async upsertUser(record: TestUserRecord): Promise<void> {
    inMemoryDb.set(record.id, record);
    logger.info({ userId: record.id }, "User record upserted");
  },
  async getUser(id: string): Promise<TestUserRecord | undefined> {
    return inMemoryDb.get(id);
  }
};
