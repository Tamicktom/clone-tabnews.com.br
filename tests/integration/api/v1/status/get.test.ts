//* Libraries imports
import { describe, expect, it } from "bun:test";

describe("GET /api/v1/status", () => {
  it("should return status ok", async () => {
    const url = "http://localhost:3000/api/v1/status";
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "accept": "application/json",
        }
      }
    );
    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(responseBody, "Response body should have status 'ok'")
      .toHaveProperty("status", "ok");
    expect(responseBody, "Response body should have property 'updated_at'")
      .toHaveProperty("updated_at");

    expect(new Date(responseBody.updated_at)
      .toString(), "Response body 'updated_at' should be a valid date")
      .not.toBe("Invalid Date");

    console.log("Response Body:", responseBody);
  });
});
