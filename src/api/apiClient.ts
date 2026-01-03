import { APIRequestContext, request, expect } from "@playwright/test";

export class apiClient {
  private context: APIRequestContext;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(endpoint: string, params?: Record<string, string>) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await this.context.get(`${endpoint}${query}`);
    return response;
  }

  async post(endpoint: string, body: object) {
    const response = await this.context.post(endpoint, { data: body });
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
