import fs from "node:fs/promises";
import path from "node:path";
import { createObjectCsvWriter } from "csv-writer";
import { buildUsers } from "../generators/user-factory";

const exportDir = path.join(process.cwd(), "data", "payloads");

const run = async (): Promise<void> => {
  const users = buildUsers(50);
  await fs.mkdir(exportDir, { recursive: true });

  await fs.writeFile(path.join(exportDir, "users.json"), JSON.stringify(users, null, 2), "utf-8");

  const csvWriter = createObjectCsvWriter({
    path: path.join(exportDir, "users.csv"),
    header: [
      { id: "name", title: "name" },
      { id: "username", title: "username" },
      { id: "email", title: "email" },
      { id: "phone", title: "phone" },
      { id: "website", title: "website" }
    ]
  });
  await csvWriter.writeRecords(users);
  console.log(`Exported ${users.length} users to payloads folder.`);
};

run();
