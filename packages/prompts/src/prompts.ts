import { Prompt } from "./prompt/index.ts";
import type { PromptResponse } from "./types/server-response.ts";

const url = "http://localhost:8000";

export class Prompts {
  private _apiKey: string;
  private _organisation: string;

  constructor(settings: { apiKey: string; organisation: string }) {
    this._apiKey = settings.apiKey;
    this._organisation = settings.organisation;
  }

  async getPrompt<T extends string[]>(
    id: string,
  ): Promise<Prompt<T>> {
    const response = await fetch(`${url}/api/prompts/${id}`, {
      headers: {
        "authorization": `Bearer ${this._apiKey}`,
        "x-organisation": this._organisation,
      },
    });

    if (!(response.status === 200)) {
      throw new Error(`Request error with status code ${response.status}`);
    }
    const promptData = (await response.json()) as PromptResponse;
    return Prompt.fromServerResponse<T>(promptData);
  }

  logApiKey(): void {
    console.log(this._apiKey);
  }
}
