import path from "node:path";
import { Verifier } from "@pact-foundation/pact";

const runVerification = async (): Promise<void> => {
  const verifier = new Verifier({
    providerBaseUrl: "https://jsonplaceholder.typicode.com",
    pactUrls: [path.resolve(process.cwd(), "tests/contract/pacts/qa-platform-consumer-user-service-provider.json")]
  });

  try {
    const output = await verifier.verifyProvider();
    console.log(output);
  } catch (error) {
    console.error("Provider verification failed due to contract drift", error);
    process.exit(1);
  }
};

runVerification();
