import { describe, it } from "bun:test";

describe("GET /api/v1/status", () => {
  it("should return status ok", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(`Expected status 200, but got ${response.status}`);
    }

    if (data.status !== "ok") {
      throw new Error(`Expected status 'ok', but got ${data.status}`);
    }
  });
});
