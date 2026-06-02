import { describe, it, expect } from "vitest";
import { retry } from "../../utils/retry";

describe("retry helper", () => {
  it("returns successful result on transient failure", async () => {
    let attempts = 0;
    const result = await retry(
      async () => {
        attempts += 1;
        if (attempts < 2) {
          throw new Error("temporary");
        }
        return "ok";
      },
      3,
      10,
      "unit-retry"
    );

    expect(result).toBe("ok");
    expect(attempts).toBe(2);
  });
});
