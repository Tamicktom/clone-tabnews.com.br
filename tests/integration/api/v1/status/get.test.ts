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

    expect(responseBody, "Response body should have property 'database'")
      .toHaveProperty("database");

    expect(responseBody.database, "Database info should have property 'version'")
      .toHaveProperty("version");

    expect(responseBody.database.version, "Database version should contain 'PostgreSQL 16.0'")
      .toContain("PostgreSQL 16.0");

    expect(responseBody.database, "Database info should have property 'connection'")
      .toHaveProperty("connection", "ok");

    expect(responseBody.database, "Database info should have property 'max_connections'")
      .toHaveProperty("max_connections");
    expect(responseBody.database.max_connections, "Max connections should be 100")
      .toBe(100);

    expect(responseBody.database, "Database info should have property 'used_connections'")
      .toHaveProperty("used_connections");
    expect(responseBody.database.used_connections, "Used connections should be a number")
      .toBe(1);
  });
});
