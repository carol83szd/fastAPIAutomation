import { test, expect } from "@playwright/test";
import { apiClient } from "..//src/api/apiClient";

test("API is up", async () => {
  const client = new apiClient("http://localhost:8000");
  await client.init();

  const response = await client.get("/api/v1/utils/health-check");

  expect(response.status()).toBe(200);
});
