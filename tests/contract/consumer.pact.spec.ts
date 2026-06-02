import path from "node:path";
import assert from "node:assert/strict";
import { Pact, Matchers } from "@pact-foundation/pact";
import axios from "axios";
import { validateSchema } from "../../utils/helpers";

const { like, integer } = Matchers;

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

const userSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    email: { type: "string" }
  },
  required: ["id", "name", "email"],
  additionalProperties: false
} as any;

const provider = new Pact({
  consumer: "qa-platform-consumer",
  provider: "user-service-provider",
  port: 9222,
  dir: path.resolve(process.cwd(), "tests/contract/pacts")
});

const run = async (): Promise<void> => {
  try {
    await provider.setup();
    await provider.addInteraction({
      state: "user 1 exists",
      uponReceiving: "a request for user 1",
      withRequest: {
        method: "GET",
        path: "/users/1",
      },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
          id: integer(1),
          name: like("John Smith"),
          email: like("john.smith@example.com"),
        },
      },
    });

    const response = await axios.get<UserResponse>(`http://localhost:9222/users/1`);
    assert.equal(response.status, 200);
    assert.equal(validateSchema(userSchema, response.data), true);
    await provider.verify();
    console.log("Consumer pact test passed.");
  } finally {
    // provider.finalize() is not available in PactV4, use provider.stop() or similar if needed, 
    // but usually, the process exit handles it.
  }
};

run().catch((error) => {
  console.error("Consumer pact test failed", error);
  process.exit(1);
});
