//* Libraries imports
import { beforeAll, describe, expect, it } from "bun:test";

import orchestrator from "@/tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  it("should return status ok", async () => {
    const url = "http://localhost:3000/api/v1/status";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });

    const responseBody = await response.json();

    expect(response.status).toBe(405);
    expect(responseBody).toEqual({
      name: "MethodNotAllowedError",
      message: "Método não permitido para este endpoint.",
      action: "Verifique se o método HTTP enviado é válido para este endpoint.",
      status_code: 405
    });
  });
});
